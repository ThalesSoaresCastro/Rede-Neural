function setup(){
    createCanvas(500, 500)
    background(0)

    let m1 = new Matrix(2,1)
    let m2 = new Matrix(2,1)
    
    m1.randomizar()
    m2.randomizar()

    m1.print()
    m2.print()

    let m3 = Matrix.sub(m2, m1)
    m3.print()


    //var nn = new RedeNeural(1, 3, 1)

    //var arr = [1,2]

    //nn.feedforward(arr)


}

function draw(){

}