import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ConsultaCepService } from "../service/consulta-cep.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  constructor(
    private router: Router,
    private consultaCepService: ConsultaCepService
  ) {}

  ngOnInit(): void {}

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(["./sucesso"]);
    } else {
      alert("Formulário inválido!");
    }
    console.log(form.controls);
  }

  consultaCep(ev: any, f: NgForm) {
    const cep = ev.target.value; //pega somente o valor que foi passado no input

    if(cep !== ''){
      this.consultaCepService
        .getConsultaCep(cep)
        .subscribe((resultado) => {
            console.log(resultado);
            this.populandoEndereco(resultado, f);
        });

    }

  }

  populandoEndereco(dados: any, f:NgForm){
    f.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })
  }

}
