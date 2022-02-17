package main

import (
    "crypto/hmac"
    "crypto/sha1"
    "fmt"
    "net/url"
    "sort"
    "strings"
    "time"
    "crypto/md5"
    "os"
    "net/http"
    "io/ioutil"
    "bytes"
	"github.com/joho/godotenv"
    "encoding/hex"
)

func calSha1sum(msg string) string {
    h := sha1.New()
    h.Write([]byte(msg))
    return fmt.Sprintf("%x", h.Sum(nil))
}

func calSha1HMACDigest(key, msg string) string {
    h := hmac.New(sha1.New, []byte(key))
    h.Write([]byte(msg))
    return fmt.Sprintf("%x", h.Sum(nil))
}

func signature(secretID, secretKey, method, path string, params, headers url.Values, expire int64) string {
    var signedHeaderList []string
    var signedParameterList []string
    hs := url.Values{}
    for key, values := range headers {
        for _, value := range values {
            var lowerKey = strings.ToLower(key)
            if lowerKey == "content-type" || lowerKey == "content-md5" || lowerKey == "host" || lowerKey[0] == 'x' {
                hs.Add(lowerKey, value)
                signedHeaderList = append(signedHeaderList, lowerKey)
            }
        }
    }
    var formatHeaders = hs.Encode()
    sort.Strings(signedHeaderList)
    ps := url.Values{}
    for key, values := range params {
        for _, value := range values {
            var lowerKey = strings.ToLower(key)
            ps.Add(lowerKey, value)
            signedParameterList = append(signedParameterList, lowerKey)
        }
    }
    var formatParameters = ps.Encode()
    sort.Strings(signedParameterList)
    var formatString = fmt.Sprintf("%s\n%s\n%s\n%s\n", strings.ToLower(method), path, formatParameters, formatHeaders);
    var signTime = fmt.Sprintf("%d;%d", time.Now().Unix() - 60, time.Now().Unix() + expire)
    //signTime = "1510109254;1510109314"
    var stringToSign = fmt.Sprintf("sha1\n%s\n%s\n", signTime, calSha1sum(formatString))
    var signKey = calSha1HMACDigest(secretKey, signTime)
    var signature = calSha1HMACDigest(signKey, stringToSign)
    return strings.Join([]string{
                "q-sign-algorithm=sha1",
                "q-ak=" + secretID,
                "q-sign-time=" + signTime,
                "q-key-time=" + signTime,
                "q-header-list=" + strings.Join(signedHeaderList, ";"),
                "q-url-param-list=" + strings.Join(signedParameterList, ";"),
                "q-signature=" + signature,
            }, "&")
}



func Sent (buf []byte) error {
    err := godotenv.Load()
    if err != nil { panic(err) }
    
    var secretId = os.Getenv("SECRET_ID")
    var secretKey = os.Getenv("SECRET_KEY")
    var host = os.Getenv("HOST")
    var topic_id = os.Getenv("TOPIC_ID")

    
    var path="/structuredlog"
    var expire = int64(300)
    var method = "POST"
    var target = &url.URL{
        Scheme: "https",
        Host: host,
        Path: path,
        RawQuery: "topic_id=" + topic_id,
    }
    var params = url.Values{"topic_id": {topic_id}}

    hash := md5.Sum(buf)
	headers := url.Values{
		"Host": {host}, 
		"User-Agent": {"AuthSDK"},
		"Connection": {"Keep-Alive"},
		"Keep-Alive": {"timeout=10, max=100000"},
		"Content-MD5": {hex.EncodeToString(hash[:])},
        "Content-Type": {"application/x-protobuf"},
	}
    sig := signature(secretId, secretKey, method, path, params, headers, expire)
    headers.Set("Authorization", sig)
    req := &http.Request {
        Method: method,
        Header: http.Header(headers),
        Body: ioutil.NopCloser(bytes.NewReader(buf)),
        Close: false,
        URL: target,
    }
    res, err := http.DefaultClient.Do(req)
    res.Body.Close()
    return err
}
