function sigmoide(x){
    return 1/(1+ Math.exp(-x))
}
//função derivada da sigmoid
function dsigmoid(x){
    return x * (1-x)
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

        this.learning_rate = 0.1
    }

    feedforward(arr){

        //Input para hidden
        let input = Matrix.arrayToMatrix(arr)
        let hidden = Matrix.mult(this.weigths_ih, input)
        hidden = Matrix.add(hidden, this.bias_ih)
        hidden.map(sigmoide)

        //hidden para Output
        //D(SIGMOID) = OUTPUT * (1-OUTPUT)
        let output = Matrix.mult(this.weigths_ho, hidden)
        output = Matrix.add(output, this.bias_ho)
        output.map(sigmoide) 

        //output.print()
        return output
    }

    train(arr, target){

        //Input para hidden
        let input = Matrix.arrayToMatrix(arr)
        let hidden = Matrix.mult(this.weigths_ih, input)
        hidden = Matrix.add(hidden, this.bias_ih)
        hidden.map(sigmoide)
        
        //hidden para Output
        //D(SIGMOID) = OUTPUT * (1-OUTPUT)
        let output = Matrix.mult(this.weigths_ho, hidden)
        output = Matrix.add(output, this.bias_ho)
        output.map(sigmoide) 
        

        //BACKPROPAGATION

        //output -> hidden
        let esperado = Matrix.arrayToMatrix(target)
        let output_error = Matrix.sub(esperado, output)
        let d_output = Matrix.map(output, dsigmoid)
        let hidden_t = Matrix.transpose(hidden)

        //Calculando o Gradiente output
        let gradiente = Matrix.hadamard(output_error, d_output)
        gradiente = Matrix.escalar_multiplica(gradiente, this.learning_rate)
        
        //ajustando bias O -> H
        this.bias_ho = Matrix.add(this.bias_ho, gradiente)

        //ajustando weigths O -> H
        let weigths_ho_deltas = Matrix.mult(gradiente, hidden_t)
        this.weigths_ho = Matrix.add(this.weigths_ho, weigths_ho_deltas)

        // hidden -> input
        let weigths_ho_t = Matrix.transpose(this.weigths_ho)
        let hidden_error = Matrix.mult(weigths_ho_t, output_error)
        let d_hidden = Matrix.map(hidden, dsigmoid)
        let input_t = Matrix.transpose(input)

        //Calculando o Gradiente hidden
        let gradiente_h = Matrix.hadamard(hidden_error, d_hidden)
        gradiente_h = Matrix.escalar_multiplica(gradiente_h, this.learning_rate)

        //ajustando bias H -> I
        this.bias_ih = Matrix.add(this.bias_ih, gradiente_h)

        //ajustando wiegths H -> I
        let weigths_ih_deltas = Matrix.mult(gradiente_h, input_t)
        this.weigths_ih = Matrix.add(this.weigths_ih, weigths_ih_deltas)
    }

    predict(arr){
        //Input para hidden
        let input = Matrix.arrayToMatrix(arr)
        let hidden = Matrix.mult(this.weigths_ih, input)
        hidden = Matrix.add(hidden, this.bias_ih)
        hidden.map(sigmoide)

        //hidden para Output
        let output = Matrix.mult(this.weigths_ho, hidden)
        output = Matrix.add(output, this.bias_ho)
        output.map(sigmoide) 

        output = Matrix.MatrixToArray(output)
        
        return output
    }

}