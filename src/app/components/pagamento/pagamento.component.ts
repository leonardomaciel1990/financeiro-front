import { Component, OnInit,ViewChild } from '@angular/core';
import { Pagamento } from '../../model/Pagamento';
import { PagamentoService } from '../../services/pagamento.service'
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  @ViewChild("form")
  form: NgForm; 
  pagamento = new Pagamento();
  message : {};
  classCss : {};
  //pagamento = {};
  pagamentos: Pagamento[];

  constructor(private pagamentoService: PagamentoService) { 

  }

  ngOnInit() {
    this.listar();
  }

  listar(){
    console.log('Listar...');
    this.pagamentoService.findAll()
    .subscribe(resposta => this.pagamentos = <any> resposta);
    
  }

  testar(){
    console.log('Nome ' + this.pagamento.cliente);
  }

  registrar(){
    this.message = {};
    //let dateString = this.pagamento.data;
    //let newDate = new Date(dateString);
    //console.log('DATA STRING ' + dateString + '  DATA - ' + newDate);
    //this.pagamento.data = newDate;
    this.pagamentoService.createOrUpdate(this.pagamento).subscribe(() => {
      this.pagamento = new Pagamento();
      this.listar();
      //let pagamento : Pagamento = responseApi.data;
      });
  /*  this.ticketService.createOrUpdate(this.ticket).subscribe((responseApi:ResponseApi) => {
      this.ticket = new Ticket('',0,'','','','',null,null,'',null);
      let ticket : Ticket = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${ticket.title} successfully`
      });
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });*/

}

editar(id:number){
  this.pagamentoService.findById(id).subscribe((res : any)=>{
    console.log(res);
    this.pagamento = res.data;
    });
}

delete(id:number){
  console.log('Deletando...' + id);
  if(confirm("Deseja realmente excluir esse registro?")){
  this.pagamentoService.delete(id).subscribe(() => {
    this.listar();
  });
}
}

}