function sigmoide(x){
    return 1/(1+ Math.exp(-x))
}

class RedeNeural{
    constructor(i_nodes, h_nodes, o_nodes){
        this.i_nodes = i_nodes
        this.h_nodes = h_nodes
        this.o_nodes = o_nodes

        this.bias_ih = new Matrix(this.h_nodes, 1)
        this.bias_ih.randomizar()
        this.bias_ho = new Matrix(this.o_nodes, 1)
        this.bias_ho.randomizar()

        //this.bias_ih.print()
        //this.bias_ho.print()

        this.weigths_ih = new Matrix(this.h_nodes, this.i_nodes)
        this.weigths_ih.randomizar()

        this.weigths_ho = new Matrix(this.o_nodes, this.h_nodes)
        this.weigths_ho.randomizar()

        //this.weigths_ih.print()
        //this.weigths_ho.print()   
    }

    feedforward(arr){

        //Input para hidden
        let input = Matrix.arrayToMatrix(arr)
        let hidden = Matrix.mult(this.weigths_ih, input)
        hidden = Matrix.add(hidden, this.bias_ih)
        hidden.map(sigmoide)

        //hidden para Output
        let output = Matrix.mult(this.weigths_ho, hidden)
        output = Matrix.add(output, this.bias_ho)
        output.map(sigmoide) 

        output.print()
    }
}