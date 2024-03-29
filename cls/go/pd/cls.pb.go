// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        v3.17.3
// source: cls.proto

package pd

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)



type Log struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Time     int64          `protobuf:"varint,1,opt,name=time,proto3" json:"time,omitempty"`        // 时间戳，UNIX时间格式
	Contents []*Log_Content `protobuf:"bytes,2,rep,name=contents,proto3" json:"contents,omitempty"` // 一条日志里的多个kv组合
}

func (x *Log) Reset() {
	*x = Log{}
	if protoimpl.UnsafeEnabled {
		mi := &file_cls_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Log) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Log) ProtoMessage() {}

func (x *Log) ProtoReflect() protoreflect.Message {
	mi := &file_cls_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Log.ProtoReflect.Descriptor instead.
func (*Log) Descriptor() ([]byte, []int) {
	return file_cls_proto_rawDescGZIP(), []int{0}
}

func (x *Log) GetTime() int64 {
	if x != nil {
		return x.Time
	}
	return 0
}

func (x *Log) GetContents() []*Log_Content {
	if x != nil {
		return x.Contents
	}
	return nil
}

type LogTag struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Key   string `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"`
	Value string `protobuf:"bytes,2,opt,name=value,proto3" json:"value,omitempty"`
}

func (x *LogTag) Reset() {
	*x = LogTag{}
	if protoimpl.UnsafeEnabled {
		mi := &file_cls_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LogTag) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LogTag) ProtoMessage() {}

func (x *LogTag) ProtoReflect() protoreflect.Message {
	mi := &file_cls_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LogTag.ProtoReflect.Descriptor instead.
func (*LogTag) Descriptor() ([]byte, []int) {
	return file_cls_proto_rawDescGZIP(), []int{1}
}

func (x *LogTag) GetKey() string {
	if x != nil {
		return x.Key
	}
	return ""
}

func (x *LogTag) GetValue() string {
	if x != nil {
		return x.Value
	}
	return ""
}

type LogGroup struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Logs        []*Log    `protobuf:"bytes,1,rep,name=logs,proto3" json:"logs,omitempty"`                     // 多条日志合成的日志数组
	ContextFlow *string   `protobuf:"bytes,2,opt,name=contextFlow,proto3,oneof" json:"contextFlow,omitempty"` // 目前暂无效用
	Filename    *string   `protobuf:"bytes,3,opt,name=filename,proto3,oneof" json:"filename,omitempty"`       // 日志文件名
	Source      *string   `protobuf:"bytes,4,opt,name=source,proto3,oneof" json:"source,omitempty"`           // 日志来源，一般使用机器IP
	LogTags     []*LogTag `protobuf:"bytes,5,rep,name=logTags,proto3" json:"logTags,omitempty"`
}

func (x *LogGroup) Reset() {
	*x = LogGroup{}
	if protoimpl.UnsafeEnabled {
		mi := &file_cls_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LogGroup) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LogGroup) ProtoMessage() {}

func (x *LogGroup) ProtoReflect() protoreflect.Message {
	mi := &file_cls_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LogGroup.ProtoReflect.Descriptor instead.
func (*LogGroup) Descriptor() ([]byte, []int) {
	return file_cls_proto_rawDescGZIP(), []int{2}
}

func (x *LogGroup) GetLogs() []*Log {
	if x != nil {
		return x.Logs
	}
	return nil
}

func (x *LogGroup) GetContextFlow() string {
	if x != nil && x.ContextFlow != nil {
		return *x.ContextFlow
	}
	return ""
}

func (x *LogGroup) GetFilename() string {
	if x != nil && x.Filename != nil {
		return *x.Filename
	}
	return ""
}

func (x *LogGroup) GetSource() string {
	if x != nil && x.Source != nil {
		return *x.Source
	}
	return ""
}

func (x *LogGroup) GetLogTags() []*LogTag {
	if x != nil {
		return x.LogTags
	}
	return nil
}

type LogGroupList struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	LogGroupList []*LogGroup `protobuf:"bytes,1,rep,name=logGroupList,proto3" json:"logGroupList,omitempty"` // 日志组列表
}

func (x *LogGroupList) Reset() {
	*x = LogGroupList{}
	if protoimpl.UnsafeEnabled {
		mi := &file_cls_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LogGroupList) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LogGroupList) ProtoMessage() {}

func (x *LogGroupList) ProtoReflect() protoreflect.Message {
	mi := &file_cls_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LogGroupList.ProtoReflect.Descriptor instead.
func (*LogGroupList) Descriptor() ([]byte, []int) {
	return file_cls_proto_rawDescGZIP(), []int{3}
}

func (x *LogGroupList) GetLogGroupList() []*LogGroup {
	if x != nil {
		return x.LogGroupList
	}
	return nil
}

type Log_Content struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Key   string `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"`     // 每组字段的 key
	Value string `protobuf:"bytes,2,opt,name=value,proto3" json:"value,omitempty"` // 每组字段的 value
}

func (x *Log_Content) Reset() {
	*x = Log_Content{}
	if protoimpl.UnsafeEnabled {
		mi := &file_cls_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Log_Content) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Log_Content) ProtoMessage() {}

func (x *Log_Content) ProtoReflect() protoreflect.Message {
	mi := &file_cls_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Log_Content.ProtoReflect.Descriptor instead.
func (*Log_Content) Descriptor() ([]byte, []int) {
	return file_cls_proto_rawDescGZIP(), []int{0, 0}
}

func (x *Log_Content) GetKey() string {
	if x != nil {
		return x.Key
	}
	return ""
}

func (x *Log_Content) GetValue() string {
	if x != nil {
		return x.Value
	}
	return ""
}

var File_cls_proto protoreflect.FileDescriptor

var file_cls_proto_rawDesc = []byte{
	0x0a, 0x09, 0x63, 0x6c, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x04, 0x6d, 0x61, 0x69,
	0x6e, 0x22, 0x7b, 0x0a, 0x03, 0x4c, 0x6f, 0x67, 0x12, 0x12, 0x0a, 0x04, 0x74, 0x69, 0x6d, 0x65,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x04, 0x74, 0x69, 0x6d, 0x65, 0x12, 0x2d, 0x0a, 0x08,
	0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x11,
	0x2e, 0x6d, 0x61, 0x69, 0x6e, 0x2e, 0x4c, 0x6f, 0x67, 0x2e, 0x43, 0x6f, 0x6e, 0x74, 0x65, 0x6e,
	0x74, 0x52, 0x08, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x73, 0x1a, 0x31, 0x0a, 0x07, 0x43,
	0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x14, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75,
	0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x22, 0x30,
	0x0a, 0x06, 0x4c, 0x6f, 0x67, 0x54, 0x61, 0x67, 0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x14, 0x0a, 0x05, 0x76, 0x61,
	0x6c, 0x75, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65,
	0x22, 0xde, 0x01, 0x0a, 0x08, 0x4c, 0x6f, 0x67, 0x47, 0x72, 0x6f, 0x75, 0x70, 0x12, 0x1d, 0x0a,
	0x04, 0x6c, 0x6f, 0x67, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x09, 0x2e, 0x6d, 0x61,
	0x69, 0x6e, 0x2e, 0x4c, 0x6f, 0x67, 0x52, 0x04, 0x6c, 0x6f, 0x67, 0x73, 0x12, 0x25, 0x0a, 0x0b,
	0x63, 0x6f, 0x6e, 0x74, 0x65, 0x78, 0x74, 0x46, 0x6c, 0x6f, 0x77, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x09, 0x48, 0x00, 0x52, 0x0b, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x78, 0x74, 0x46, 0x6c, 0x6f, 0x77,
	0x88, 0x01, 0x01, 0x12, 0x1f, 0x0a, 0x08, 0x66, 0x69, 0x6c, 0x65, 0x6e, 0x61, 0x6d, 0x65, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x09, 0x48, 0x01, 0x52, 0x08, 0x66, 0x69, 0x6c, 0x65, 0x6e, 0x61, 0x6d,
	0x65, 0x88, 0x01, 0x01, 0x12, 0x1b, 0x0a, 0x06, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x18, 0x04,
	0x20, 0x01, 0x28, 0x09, 0x48, 0x02, 0x52, 0x06, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x88, 0x01,
	0x01, 0x12, 0x26, 0x0a, 0x07, 0x6c, 0x6f, 0x67, 0x54, 0x61, 0x67, 0x73, 0x18, 0x05, 0x20, 0x03,
	0x28, 0x0b, 0x32, 0x0c, 0x2e, 0x6d, 0x61, 0x69, 0x6e, 0x2e, 0x4c, 0x6f, 0x67, 0x54, 0x61, 0x67,
	0x52, 0x07, 0x6c, 0x6f, 0x67, 0x54, 0x61, 0x67, 0x73, 0x42, 0x0e, 0x0a, 0x0c, 0x5f, 0x63, 0x6f,
	0x6e, 0x74, 0x65, 0x78, 0x74, 0x46, 0x6c, 0x6f, 0x77, 0x42, 0x0b, 0x0a, 0x09, 0x5f, 0x66, 0x69,
	0x6c, 0x65, 0x6e, 0x61, 0x6d, 0x65, 0x42, 0x09, 0x0a, 0x07, 0x5f, 0x73, 0x6f, 0x75, 0x72, 0x63,
	0x65, 0x22, 0x42, 0x0a, 0x0c, 0x4c, 0x6f, 0x67, 0x47, 0x72, 0x6f, 0x75, 0x70, 0x4c, 0x69, 0x73,
	0x74, 0x12, 0x32, 0x0a, 0x0c, 0x6c, 0x6f, 0x67, 0x47, 0x72, 0x6f, 0x75, 0x70, 0x4c, 0x69, 0x73,
	0x74, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x6d, 0x61, 0x69, 0x6e, 0x2e, 0x4c,
	0x6f, 0x67, 0x47, 0x72, 0x6f, 0x75, 0x70, 0x52, 0x0c, 0x6c, 0x6f, 0x67, 0x47, 0x72, 0x6f, 0x75,
	0x70, 0x4c, 0x69, 0x73, 0x74, 0x42, 0x06, 0x5a, 0x04, 0x2e, 0x2f, 0x70, 0x64, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_cls_proto_rawDescOnce sync.Once
	file_cls_proto_rawDescData = file_cls_proto_rawDesc
)

func file_cls_proto_rawDescGZIP() []byte {
	file_cls_proto_rawDescOnce.Do(func() {
		file_cls_proto_rawDescData = protoimpl.X.CompressGZIP(file_cls_proto_rawDescData)
	})
	return file_cls_proto_rawDescData
}

var file_cls_proto_msgTypes = make([]protoimpl.MessageInfo, 5)
var file_cls_proto_goTypes = []interface{}{
	(*Log)(nil),          // 0: main.Log
	(*LogTag)(nil),       // 1: main.LogTag
	(*LogGroup)(nil),     // 2: main.LogGroup
	(*LogGroupList)(nil), // 3: main.LogGroupList
	(*Log_Content)(nil),  // 4: main.Log.Content
}
var file_cls_proto_depIdxs = []int32{
	4, // 0: main.Log.contents:type_name -> main.Log.Content
	0, // 1: main.LogGroup.logs:type_name -> main.Log
	1, // 2: main.LogGroup.logTags:type_name -> main.LogTag
	2, // 3: main.LogGroupList.logGroupList:type_name -> main.LogGroup
	4, // [4:4] is the sub-list for method output_type
	4, // [4:4] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_cls_proto_init() }
func file_cls_proto_init() {
	if File_cls_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_cls_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Log); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_cls_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LogTag); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_cls_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LogGroup); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_cls_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LogGroupList); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_cls_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Log_Content); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_cls_proto_msgTypes[2].OneofWrappers = []interface{}{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_cls_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   5,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_cls_proto_goTypes,
		DependencyIndexes: file_cls_proto_depIdxs,
		MessageInfos:      file_cls_proto_msgTypes,
	}.Build()
	File_cls_proto = out.File
	file_cls_proto_rawDesc = nil
	file_cls_proto_goTypes = nil
	file_cls_proto_depIdxs = nil
}
