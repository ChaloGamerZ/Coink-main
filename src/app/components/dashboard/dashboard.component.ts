import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator}  from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/datos';
import { DatosService } from 'src/app/datos.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title = 'componente_rick_morty';
  showFiller = false;
  results = [];
  displayedColumns: string[] = ['name', 'status', 'species','location', 'episode'];
  public dataPersonas: Usuario[] = [];
  public dataSource = new MatTableDataSource<Usuario>(this.dataPersonas);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private datosServices: DatosService) {}

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };

    this.datosServices.getAllData().subscribe(
      (response) => {
        this.results = response.results;
        this.dataSource = new MatTableDataSource<Usuario>(this.results);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = 'Items por página';
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = (page + 1) * pageSize;
          return `${start} - ${end} de ${length}`;
        };
      },
      (error) => {
        console.error('Request failed with error', error)

      },
      () => {
      
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue.trim()); 
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) ;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue.trim()); 

    // Se tiene que cambiar el tipo de dato en return data.(dato a filtar)

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.species.toLowerCase().includes(filter) ;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
