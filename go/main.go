package main

import (
	"fmt"
	"os"
	"encoding/json"
	"local/sts"
	"net/http"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	appid := os.Getenv("COS_APPID")
	bucket := os.Getenv("COS_BUCKET")
	c := sts.NewClient(
		os.Getenv("COS_SECRETID"),
		os.Getenv("COS_SECRETKEY"),
		nil,
	)
	// 设置域名, 默认域名sts.tencentcloudapi.com
	// c.SetHost("")
	// case 1 请求临时密钥
	requestKey := func (w http.ResponseWriter, req *http.Request) {
		params := req.URL.Query()
		path := params["path"][0]
		fmt.Println(path)
		res, err := c.GetCredential(config(path, appid, bucket))
		if err != nil {
			fmt.Println(err)
		}
		temp := make(map[string]interface{})
		keys, _ := json.Marshal(res.Credentials)
		json.Unmarshal(keys, &temp)
		temp["path"] = path
		response, _ := json.Marshal(temp)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprint(w, string(response))
	}


	http.HandleFunc("/getkey", requestKey)
	http.Handle("/", http.FileServer(http.Dir(".")))
	http.ListenAndServe(":" + os.Getenv("PORT"), nil)
}

func config(path, appid, bucket string, ) *sts.CredentialOptions {
	opt := &sts.CredentialOptions{
		DurationSeconds: int64(1800),
		Region:          "ap-shanghai",
		Policy: &sts.CredentialPolicy{
			Statement: []sts.CredentialPolicyStatement{
				{
					// 密钥的权限列表。简单上传和分片需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
					Action: []string{
						// 简单上传
						"name/cos:PostObject",
						"name/cos:PutObject",
						// 分片上传
						"name/cos:InitiateMultipartUpload",
						"name/cos:ListMultipartUploads",
						"name/cos:ListParts",
						"name/cos:UploadPart",
						"name/cos:CompleteMultipartUpload",
						"name/cos:DeleteObject",
					},
					Effect: "allow",
					Resource: []string{
						//这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
						"qcs::cos:ap-shanghai:uid/" + appid + ":" + bucket +  path,
					},
				},
			},
		},
	}
	return opt
}