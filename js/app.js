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
        alert("page start3")
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
                self.activeCamera = cameras[0]
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
