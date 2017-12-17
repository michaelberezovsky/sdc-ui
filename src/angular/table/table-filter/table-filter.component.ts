import {Component, OnInit, AfterViewInit, Input, Output, ViewChildren, QueryList, EventEmitter} from "@angular/core";
import {IComponentFilterGroup, IFilterGroup} from '../models/table.models';
import {TableSimpleFilterComponent} from './table-simple-filter.component';
import {TableRangeFilterComponent} from './table-range-filter.component';

@Component({
    selector: 'sdc-table-filter',
    templateUrl: './table-filter.component.html',
//    styleUrls: ['./table-filter.component.css']
    styles: [`.sdc-table-filter {
        border: 1px solid #666;
        background-color: white;
        padding: 10px;
        margin-bottom: 5px;
    }

    .sdc-table-filter-group {
        border: 1px solid #666;
        padding: 10px;
        margin-bottom: 5px;
        background-color: white;
    }

    .sdc-table-filter-form {
        display: block;
    }

    .sdc-table-filter-form-group {
        display: flex;
        width: 240px;
        margin: 10px;
        /*padding-top: 20px;*/
    }
    .sdc-table-filter-label, .sdc-table-filter-input  {
        width: 150px;
        flex-grow: 0;
        flex-shrink: 0;
    }
    .sdc-table-filter-input {

    }
    .sdc-table-filter-button {
        padding: 5px 5px;
    }
    `]
})
export class TableFilterComponent implements OnInit, AfterViewInit {

    @Input() headerCols: any;
    @Output('changed') changed: EventEmitter<IFilterGroup[]> = new EventEmitter();

    @ViewChildren(TableSimpleFilterComponent) simpleComponents: QueryList<Component>;
    @ViewChildren(TableRangeFilterComponent) rangeComponents: QueryList<Component>;

    ngOnInit(): void {
    }

    ngAfterViewInit() {
    }

    public runFilter() {
        let groups: IFilterGroup[] = [];

        this.getFilterComponents(this.simpleComponents, groups);
        this.getFilterComponents(this.rangeComponents, groups);

        this.changed.next(groups);
    }

    private getFilterComponents(components: QueryList<Component>, groups: IFilterGroup[]): void {
        components.forEach((child)=> {
            let group: IFilterGroup = (child as IComponentFilterGroup).filterGroup;

            if (group.filters.length > 0) {
                groups.push(group);
            }
        })
    }

    public clearFilter() {
        this.clearFilterGroups(this.simpleComponents);
        this.clearFilterGroups(this.rangeComponents);

        this.runFilter();
    }

    private clearFilterGroups(components: QueryList<Component>) {
        components.forEach((child)=> {
            (child as IComponentFilterGroup).clearFilterGroup();
        });
    }
}
