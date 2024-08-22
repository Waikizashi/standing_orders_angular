import { Component } from '@angular/core';
import { CodeTableService } from '../../services/code-table.service';
import { StringCodeTable } from '../../models/string-code-table';
import { tap } from 'rxjs';

@Component({
  selector: 'app-string-code-table-dialog',
  templateUrl: './constant-symbol-table-dialog.component.html',
  styleUrls: ['./constant-symbol-table-dialog.component.scss']
})

export class ConstantSymbolTableDialogComponent {
  constantSymbols: StringCodeTable[] = [];
  loadSpinner: boolean = true;
  constructor(private codeTableService: CodeTableService) { }

  ngOnInit() {
    this.codeTableService.getConstantSymbols().pipe(tap((data) => {
      this.constantSymbols.push(...data);
      this.constantSymbols.sort((a, b) => {
        const aValue = parseInt(a.value ?? '0', 10);
        const bValue = parseInt(b.value ?? '0', 10);
        return aValue - bValue;
      });
      this.loadSpinner = false;
    })).subscribe();

  }
}

