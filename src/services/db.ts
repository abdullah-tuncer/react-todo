import Dexie, {type EntityTable} from 'dexie';
import type {IJob} from "../types/Job.ts";

const db = new Dexie('JobsDatabase') as Dexie & {
    jobs: EntityTable<IJob, 'id'>;
};

db.version(1).stores({
    jobs: '++id, title, color, tasks, fav'
});

export {db};