import type { Interface } from "readline";

export type DatabaseType = 'postgres' | 'mysql' | 'sqlite';

export interface ProjectSchema{
    id:string;
    name:string;
    dbType:DatabaseType;
}