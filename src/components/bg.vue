<template>
    <div style="position:fixed;    z-index: -1;">
       <canvas id="space" width="1920" height="1080"></canvas>
    </div>
</template>

<script>

  export default {
    data() {
      return {
        numStars: 1900,
        radius: '0.'+Math.floor(Math.random() * 9) + 1,
        focalLength:0,
        stars:[],
        canvas:null,
        canvas2d:null,
        centerX:0,
        centerY:0,
        warp:0,
        animate:true
      };
    },
    mounted: function () {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        
        this.canvas = document.getElementById("space");
        this.canvas2d = this.canvas.getContext("2d");
        this.focalLength = this.canvas.width * 2;

        this.initializeStars();
        this.executeFrame();
    },
    methods: {
        drawStars(){
            var pixelX, pixelY, pixelRadius;
            if(this.canvas.width != window.innerWidth || this.canvas.height != window.innerHeight){
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;               
                this.initializeStars();           
            }
            if(this.warp==0){
                this.canvas2d.fillStyle = "rgba(0,10,20,1)";
                this.canvas2d.fillRect(0,0, this.canvas.width, this.canvas.height);
            }            
            this.canvas2d.fillStyle = "rgba(209, 255, 255, "+this.radius+")";
            var star;var i;
            for(i = 0; i < this.numStars; i++){
                star = this.stars[i];
                
                pixelX = (star.x - this.centerX) * (this.focalLength / star.z);
                pixelX += this.centerX;
                pixelY = (star.y - this.centerY) * (this.focalLength / star.z);
                pixelY += this.centerY;
                pixelRadius = 1 * (this.focalLength / star.z);

                this.canvas2d.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
                this.canvas2d.fillStyle = "rgba(209, 255, 255, "+star.o+")";

            }            
        },
        initializeStars(){
            this.stars = [];
            this.centerX = this.canvas.width / 2;
            this.centerY = this.canvas.height / 2;
            var star;var i;
            for(i = 0; i < this.numStars; i++){
                star = {
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    z: Math.random() * this.canvas.width,
                    o: '0.'+Math.floor(Math.random() * 99) + 1
                };
                this.stars.push(star);
            }            
        },
        executeFrame(){
            if(this.animate){
                window.requestAnimationFrame(this.executeFrame);
            }
            this.moveStars();
            this.drawStars();
        },
        moveStars(){
            var star;
            for(var i = 0; i < this.numStars; i++){
                star = this.stars[i];
                star.z--;
                
                if(star.z <= 0){
                    star.z = this.canvas.width;
                }
            }     
        }
    }      
  };
</script>

<style>
#space {
  width: 100%
}
</style>
