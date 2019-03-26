import { Injectable } from '@angular/core';
import { FINANCEIRO_API } from '../services/Financeiro.api';
import { HttpClient} from '@angular/common/http';
import { Pagamento } from '../model/Pagamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  constructor(private http: HttpClient) {}

  salvar(pagamento: any) {
    console.log('salvar... ' + pagamento);
    return this.http.post('http://localhost:8080/api/pagamento', pagamento);
  }

  createOrUpdate(pagamento: Pagamento){
    if(pagamento.id != null){
      return this.http.put(`${FINANCEIRO_API}/api/pagamento`,pagamento);
    } else {
      pagamento.id = null;
      return this.http.post(`${FINANCEIRO_API}/api/pagamento`, pagamento);
    }
  }

  findAll(){
    return this.http.get(`${FINANCEIRO_API}/api/pagamento`);
  }

  findById(id:number){
    console.log('ID EDITAR... ' + id)
    return this.http.get(`${FINANCEIRO_API}/api/pagamento/${id}`);
  }

  delete(id:number){
    console.log('ID... ' + id)
    return this.http.delete(`${FINANCEIRO_API}/api/pagamento/${id}`);
  }

}
