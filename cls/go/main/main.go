package main

import (
	"fmt"

	// "log/pd"
	"os"
	// "time"
	"github.com/gomodule/redigo/redis"
	// "google.golang.org/protobuf/proto"
	"github.com/joho/godotenv"
)

// var logSchema = []string{
// 	  // order is important !
// 		"request",
// 		"remote_addr",
// 		"status",
// 		"body_bytes_sent",
// 		"upstream_response_time",
// 		"http_x_forwarded_for",
// 		"http_referer",
// 		"request_time",
// }

// func parser(message string) *pd.Log {
// 	var contents []*pd.Log_Content
// 	values := strings.Split(message, "|")
// 	for i := 0; i < len(values); i++ {
// 		pair := &pd.Log_Content {
// 			Key: logSchema[i],
// 			Value: values[i],
// 		}
// 		contents = append(contents, pair)
// 	}
// 	log := &pd.Log {
// 		Time: time.Now().Unix(),
// 		Contents: contents,
// 	}
// 	return log
// }

// func sendToTencent(log *pd.Log) {
// 	payload := &pd.LogGroupList {
// 		LogGroupList: []*pd.LogGroup {
// 			{
// 				Logs: []*pd.Log,
// 			},
// 		},
// 	}
// 	buf, err := proto.Marshal(payload)
// 	if err != nil { panic(err) }
// 	Sent(buf)
// 	logs = logs[:0]
// }

var group = "go"
var consumer = "a"
var stream = "access_logs"

func main () {
	err := godotenv.Load("../../.env")
	if err != nil { panic(err) }
	con, err := redis.DialURL(os.Getenv("REDIS_URL"))
	message, err := con.Do("XREADGROUP", "GROUP", group, consumer, "BLOCK", 2000, "COUNT", 5, "STREAMS", stream, ">")
	if err != nil { fmt.Println(err) }
	print(message)
	// fmt.Println(message)
}


type Message struct {
	logs []interface{}
}

// func eventListener() {
// 	con, err := redis.DialURL(os.Getenv("REDIS_URL"))
// 	if err != nil { panic(err) }
// 	defer con.Close()
// 	// start := time.Now().Unix()
// 	for {
// 		reply, err := redis.ByteSlices(con.Do("BLPOP", "access_logs", 0))
// 		if err != nil { panic(err) }
// 		message := string(reply[1])
// 		for len(message) > 0 {
// 			log := parser(message)
// 			sendToTencent(log)
// 			r, err := redis.Bytes(con.Do("LPOP", "access_logs"))
// 			if err != nil { panic(err) }
// 			message = string(r)
// 		}
// 		// duration := (time.Now().Unix() - start) / 1000



func print (message interface{}) {
	switch value := message. (type) {
		case []byte:
			fmt.Print(string(value))
		case []interface{}:
			for _, v := range value {
				print(v)
			}
		case map[string]interface{}:
			for _, v := range value {
				print(v)
			}
		default:
			fmt.Println(value)
		}	
}