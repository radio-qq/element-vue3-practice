import type { TableProps, PaginationProps, TableColumnCtx } from "element-plus";

import type {
  BasicFormProps,
  FormSchema,
} from "@/components/basic-form/src/type";
import type { Page } from "@/components/basic-pagination";
import type { BasicImportProps } from "@/components/basic-import";
import type { BasicExportProps } from "@/components/basic-export";

export type PageMap = {
  [K in keyof Pick<Page, "pageSize" | "currentPage">]: string;
};

export interface BasicTableProps {
  schemas: TableSchema[];
  data?: Recordable[];
  tableDatas?: Array<Recordable>;
  request?: (params: Recordable) => Promise<{
    data: {
      records: Array<Recordable>;
      total: number;
    };
  }>;
  extraParams?: Recordable;
  paramsFormatter?: (params: Recordable) => Recordable;
  dataFormatter?: (tableDatas: Array<Recordable>) => Array<Recordable>;
  immediate?: boolean;
  loading?: boolean;
  ellipsis?: boolean;

  searchProps?: Partial<BasicFormProps>;
  tableProps?: Partial<TableProps<unknown>> & { columnWidth: number };
  paginationProps?: Partial<PaginationProps>;

  hasSelection?: boolean;
  selectionColumnProps?: Recordable;

  hasIndex?: boolean;
  indexColumnProps?: Recordable;

  hasExpand?: boolean;
  expandColumnProps?: Recordable;

  importConfig: Pick<BasicImportProps, "config">;
  exportConfig?: Pick<BasicExportProps, "config">;
}

export interface BasicTableEmits {
  (e: "search", params: Recordable): void;
  (e: "reset", params: Recordable): void;
  (e: "pagination-change", page: Page): void;
  (e: "request-error", error: unknown): void;
  (e: "request-complete", tableDatas: Array<Recordable>): void;
}

export type BasicTableBodyProps = Pick<
  BasicTableProps,
  | "schemas"
  | "data"
  | "dataFormatter"
  | "tableProps"
  | "hasSelection"
  | "selectionColumnProps"
  | "hasIndex"
  | "indexColumnProps"
  | "hasExpand"
  | "expandColumnProps"
> & { columnWidth: number };

export type RenderType = string | VNode | Component;

export type DisplayType =
  | "img"
  | "link"
  | "tag"
  | "progress"
  | "copy"
  | "badge";

export interface TableColumn extends TableColumnCtx<any> {}

export type FormatterParams = {
  row: Recordable;
  column: TableColumn;
  columnIndex: number;
  schema: TableSchema;
  value: any;
};

export interface TableSchema {
  prop?: string;
  label?: string;
  width?: string | number;
  visible?: boolean;
  tooltip?: string;
  formatter?: (params: FormatterParams) => string | VNode;

  searchable?: boolean;
  searchConfig?: FormSchema;

  columnProps?: Recordable;
  columnSlots?: Recordable;

  renderHeader?: (label: string, props: TableSchema) => RenderType;
  slotHeader?: string;

  render?: (
    value: any,
    data: { row: Recordable; column: TableSchema; index: number }
  ) => RenderType;
  slot?: string;

  displayType?: DisplayType;
  displayProps?: Recordable;
}
