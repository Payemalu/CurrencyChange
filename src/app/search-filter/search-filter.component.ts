import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
  providers: []
})
export class SearchFilterComponent implements OnInit {
  currencies: string[];
  cryptoCurrOptions: IMultiSelectOption[];
  selectedCurrency: string;
  optionsModel: number[];

  today: number = Date.now();

  // Configuracion de ajustes
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 5,
    displayAllSelectedText: true
  };

  // Text configuration
  myTexts: IMultiSelectTexts = {
    checkAll: 'Seleccionar Todo',
    uncheckAll: 'Deseleccionar Todo',
    checked: 'Elemento Seleccionado',
    checkedPlural: 'Elementos Seleccionados',
    searchPlaceholder: 'Buscar',
    searchEmptyResult: 'No se encontró...',
    searchNoRenderText: 'Escriba en el cuadro de búsqueda para ver los resultados...',
    defaultTitle: 'Criptos Filtro',
    allSelected: 'Todos los Seleccionados',
  };

  constructor(private appService: AppService) {
    this.currencies = ['usd', 'mex'];
    this.selectedCurrency = '';
    this.cryptoCurrOptions = [];
    this.appService.coinsSubject.subscribe({
      next: (v) => this.updateCryptoOptions(v),
    });
  }

  ngOnInit() {
  }

  selectCurrency(newValue) {
    this.appService.loadMarketCaps(newValue);
  }

  filterChange(newValue) {
    // El método BUG no debe ser activado por la selección de filtro
    this.appService.updateFilter(newValue);
  }

  updateCryptoOptions(coins) {
    this.cryptoCurrOptions = [];
    coins.forEach((coin, index) => {
      this.cryptoCurrOptions.push({
        id: index,
        name: coin.id.charAt(0).toUpperCase() + coin.id.slice(1)
      });
    });
  }
}