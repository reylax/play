(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[905],{4324:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var r=n(5893),i=n(3206),o=n(7261),s=n(7294),a=n(8342);function l(e){var t=e.imageUrl,n=e.targetId,i=e.giftId,o=(0,s.useState)(!1),l=o[0],u=o[1],c=l?"animate-sent invisible":"",d=(0,a.Fg)(),f=d.matchSocketSend,v=d.user._id;return(0,r.jsx)("div",{className:"relative",children:(0,r.jsx)("div",{className:"w-8 h-8 cursor-pointer hover:scale-110 mt-1 ".concat(c),onClick:function(){return u(!0),void f({type:"ptp",purpose:"sent_gift",sender_id:v,target_id:n,message:i})},children:(0,r.jsx)("img",{src:t,alt:"gif, giftIdtImg"})})})}var u=n(6829),c=n(2527),d=n(5063),f=n.n(d);function v(){var e=(0,o.Z)(["\n  query ($videoId: String!) {\n    getVideo(videoId: $videoId) {\n      id,\n      content,\n      subtitles,\n    }\n  }\n"]);return v=function(){return e},e}var h=(0,c.ZP)(v());function x(e){var t,n=e.videoId,i=e.targetId,o=(0,u.useQuery)(h,{fetchPolicy:"network-only",variables:{videoId:n},onError:console.error}).data,a=(0,s.useState)(""),c=a[0],d=a[1],v=(0,s.useRef)(null);return(0,s.useEffect)((function(){fetch("/subtitles.txt").then((function(e){return e.text()})).then((function(e){return d(e)}))}),[]),(0,s.useEffect)((function(){var e=v.current;null===e||void 0===e||e.load()}),[o]),(0,r.jsxs)("div",{className:"flex flex-col justify-between",style:{height:"calc(100vh - 51px)"},children:[(0,r.jsx)("section",{className:"py-3.5 px-4",children:(0,r.jsx)("video",{ref:v,controls:!0,controlsList:"nodownload",className:"rounded-xl w-full",children:(0,r.jsx)("source",{src:null===o||void 0===o||null===(t=o.getVideo)||void 0===t?void 0:t.content,type:"video/mp4"})})}),(0,r.jsx)("section",{className:"flex-1 border-b border-t border-primary-50",children:(0,r.jsx)("textarea",{readOnly:!0,value:c,className:"w-full h-full outline-none scrollbar-hide text-xl p-4 pl-8",onWheel:function(e){return e.stopPropagation()}})}),(0,r.jsx)("section",{className:"h-14 flex items-center justify-center",children:f().map((function(e){var t=e.id,n=e.imageUrl;return(0,r.jsx)(l,{giftId:t,imageUrl:n,targetId:i},t)}))})]})}var g=n(1163);function p(){var e=(0,g.useRouter)().query;return e.videoId?(0,r.jsx)(i.Z,{Page:function(){return(0,r.jsx)(x,{videoId:e.videoId,targetId:e.targetId})}}):(0,r.jsx)("p",{children:" loading..."})}},5708:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/talk",function(){return n(4324)}])}},function(e){e.O(0,[294,206,774,888,179],(function(){return t=5708,e(e.s=t);var t}));var t=e.O();_N_E=t}]);