import { ConsultaCepService } from './../service/consulta-cep.service';
import { Validator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { Directive } from '@angular/core';
import { map, Observable } from 'rxjs'

@Directive({
  selector: '[cepValidator]',
  providers:[{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidandoCepDirective,
    multi: true
  }]
})
export class ValidandoCepDirective implements AsyncValidator{

  constructor(private consultaCepService: ConsultaCepService) { }

  validate(control: AbstractControl): Promise <ValidationErrors | null> | Observable <ValidationErrors | null> {
    const cep = control.value;

    return this.consultaCepService.getConsultaCep(cep).pipe(map(
      (resultado: any) => resultado.erro ? {'cepValidator': true} : null
    ));
   
  }

}
