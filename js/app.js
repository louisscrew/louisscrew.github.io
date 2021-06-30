var app = new Vue({
    el: '#app',
    data: {
        scanner: null,
        activeCameraId: null,
        activeCamera: null,
        cameras: [],
        scans: [],
    },
    mounted: function () {
        var self = this;
        alert("page start4")
        self.scanner = new Instascan.Scanner({
            video: document.getElementById('preview'),
            scanPeriod: 5,
            mirror:false,//不用镜像模式，镜像模式类似于镜子
        });
        self.scanner.addListener('scan', function (content, image) {
            self.scans.unshift({ date: +Date.now(), content: content });
        });
        Instascan.Camera.getCameras()
            .then(function (cameras) {
                self.cameras = cameras
                for(let c of cameras){
                    alert(JSON.stringify({c}))
                }
                if (cameras.length > 1) {//取后置摄像头
                    alert("多个摄像头22")
                    // let tmpCamera = self.cameras[0]
                    let tmpCamera = self.cameras.find((ca) => {
                        return ca.name.includes("后置")===true || ca.name.includes("Back")===true
                    })
                    if (tmpCamera) {
                        self.activeCamera = tmpCamera
                    }
                } else if (cameras.length === 1) {//一个摄像头
                    alert("只有一个摄像头22")
                    self.activeCamera = cameras[0]
                } else {
                    alert("meiyou shexiangtou ")
                }
                self.scanner.start(self.activeCamera)
            })
            .catch(function (e) {
                alert('error message：'+e)
                console.error(e);
            });
    },
    methods: {
        formatName: function (name) {
            return name || '(unknown)';
        },
        selectCamera: function (camera) {
            this.activeCameraId = camera.id;
            // alert(222)
            this.scanner.start(camera);
        },
    },
});
