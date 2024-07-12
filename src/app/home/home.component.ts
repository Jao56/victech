import { Component, OnInit } from '@angular/core';
import { MeiosDeTransporte } from '../enum/home-enum';
import { ItemService } from '../services/itens-service';
import { Item } from '../model/item-model';
import { Usuario } from '../model/usuario-model';
import { UsuarioService } from '../services/usuario-service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.buscarItens();
    this.buscarUsuarios();
  }

  tipoTransporteTemporario?: MeiosDeTransporte;
  ItensTemporaros: Item[] = [];

  constructor(private itemService: ItemService, private usuarioService: UsuarioService, private toastService: ToastrService) { }
  meiosTransporte = Object.entries(MeiosDeTransporte).map(([key, value]) => ({
    key, value
  }));
  itens: Item[] = [];
  usuario: Usuario = new Usuario;
  listaUsuarios: Usuario[] = [];
  // listaUsuarios: MatTableDataSource<Usuario> = new MatTableDataSource();
  listaUsuariosOriginal: Usuario[] = [];
  pesquisaNome: string = '';
  displayedColumns: string[] = [
    'nome',
    'email',
    'tipoTransporte',
    'listaItens',
    'editar',
    'deletar'
  ];



  buscarItens() {
    this.itemService.buscarItens().subscribe({
      next: res => {
        this.itens = res;
      },
      error: err => {
        this.toastService.error('Erro ao buscar Itens')
      }
    })
  }


  selecionarItens(event: any) {
    this.usuario.listaItens = event.value
  }
  salvarUsuario() {
    if (this.validarCampos()) {
      this.usuario.tipoTransporte = this.tipoTransporteTemporario;
      this.usuario.listaItens = this.ItensTemporaros;
      this.usuarioService.salvarUsuarios(this.usuario).subscribe({
        next: res => {
          this.toastService.success('Usuário salvo com sucesso!')
          this.buscarUsuarios();
          this.usuario = new Usuario;
          this.tipoTransporteTemporario = undefined;
          this.ItensTemporaros = [];
        },
        error: err => {
          this.toastService.error('Erro ao salvar o usuário.')
        }
      })
    }
  }

  buscarUsuarios() {
    this.usuarioService.buscarUsuarios().subscribe({
      next: res => {
        this.listaUsuarios = res;
        this.listaUsuariosOriginal = res;
      },
      error: err => {
        this.toastService.error('Erro ao buscar usuários')
      }
    })
  }

  validarCampos(): boolean {
    if (this.usuario != null) {
      if (this.usuario.nome == null || this.usuario.nome.length < 3) {
        this.toastService.error("Por favor, insira o nome de usuário.")
        return false;
      }
      if (!this.validarEmail(this.usuario.email)) {
        this.toastService.error("Por favor, insira um email válido.")
        return false;
      }
      if (this.tipoTransporteTemporario == null) {
        this.toastService.error("Por favor, selecione o tipo de transporte.")
        return false;
      }
      if (this.ItensTemporaros == null || this.ItensTemporaros.length < 1) {
        this.toastService.error("Por favor, selecione os itens.")
        return false;
      }
      return true
    }
    return false;
  }
  validarEmail(email: string): boolean {
    if (!email) {
      return false;
    }
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    return re.test(email);

  }
  gerarMeioTransporte(s: string): string {
    return this.meiosTransporte.find(x => x.key == s)?.value || s;
  }
  editarUsuario(usuario: Usuario) {
    this.usuario = usuario;
    this.ItensTemporaros = usuario.listaItens;
    this.tipoTransporteTemporario = usuario.tipoTransporte;
  }

  compareItens(o1: any, o2: any) {
    if(o1.id == o2.id)
    return true;
    else return false
  }

  deletarUsuario(id: Number) {
    this.usuarioService.deletarUsuario(id).subscribe({
      next: res => {
        this.toastService.success('Usuario deletado com sucesso')
        this.buscarUsuarios()
      },
      error: err => {
        this.toastService.error('Erro ao deletar o usuário')
      }
    })
  }
  filtrarUsuarios() {
    const filtro = this.pesquisaNome.toLowerCase();
    this.listaUsuarios = this.listaUsuariosOriginal.filter(usuario =>
      usuario.nome?.toLowerCase().includes(filtro)
    );
  }
}

