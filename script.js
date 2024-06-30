const canvas = document.getElementById('c1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

console.log(ctx)

// ctx.fillStyle = 'white';
// ctx.strokeStyle = 'white'
// ctx.lineWidth = 30;
// ctx.lineCap = 'round'

// ctx.beginPath();
// ctx.moveTo(100, 200); // line ki starting
// ctx.lineTo(300, 500); // line ki ending

// ctx.stroke()

let particleArray;

let mouse ={
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.height/80)
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
)


class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    //funciton to make individual particle
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#8C5523';
        ctx.fill();
    }


    // to check particle, mouse  ki position
    update(){
        if(this.x > canvas.width || this.x < 0){
            this.directionX = - this.directionX;
        }

        if(this.y > canvas.width || this.y < 0){
            this.directionY = - this.directionY;
        }

        
        // checking colllosion of particles
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx* dx + dy* dy);
        if(distance < mouse.radius + this.size){
            
                //for x
                if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                    this.x += 10;
                }
                if( mouse.x > this.x && this.x > this.size * 10){
                    this.x -= 10;
                }

                //for y
                if( mouse.y < this.y && this.y < canvas.height - this.size * 10){
                    this.y   += 10;
                }
                if( mouse.y > this.y && this.y > this.size * 10){
                    this.y -= 10;
                }
            }

            //moving particles
        
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();


        }
    }


    function init(){
        particleArray = [];
        let totalParticles = (canvas.height * canvas.width) / 9000;

        for(let i = 0 ; i < totalParticles; i++){
            let size = (Math.random() * 5) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 5) - 2.5;
            let directionY = (Math.random() * 5) - 2.5;
            let color = '#8C5523';

            particleArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect(){
        for(let i = 0; i < particleArray.length; i++){
            for(let j = i; j < particleArray.length; j++){
                let distances = ((particleArray[i].x - particleArray[j].x)* (particleArray[i].x - particleArray[j].x))
            + ((particleArray[i].y - particleArray[j].y)    * (particleArray[i].y - particleArray[j].y ))
        
            //connecting particles, if smaller number then longer lines and more distant particles will be connected
            if( distances < (canvas.width/ 7) * (canvas.height/7)){
                ctx.strokeStyle='rgba(140, 85, 31, 1)';
                ctx.linewidth = 1;
                ctx.beginPath();

                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);

                ctx.stroke();
            }
        }

            
        }
    }

    function animate(){
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for(let i = 0; i < particleArray.length; i++){
            particleArray[i].update();
        }
        connect();
    }

    //there is this error/bug, which occurs on resizing , to solve this
    window.addEventListener('resize', 
        function(){
            canvas.width = innerWidth;
            canvas.height = innerHeight; 
            mouse.radius = (canvas.height/80) * (canvas.height/80);
            init();
        }
    )

   

    init();
    animate();