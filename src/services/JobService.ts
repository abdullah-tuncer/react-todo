import {db} from './db.ts';
import type {IJob} from '../types/Job.ts';

class JobService {
    async addJob(job: IJob): Promise<number | undefined> {
        return (await db.jobs.add(job));
    }

    async getJobs(): Promise<IJob[]> {
        return (await db.jobs.toArray());
    }

    async getSortedJobs(): Promise<IJob[]> {
        const jobs = await db.jobs.toArray();
        return jobs.sort((a, b) => Number(b.fav) - Number(a.fav));
    }

    async updateJob(id: number, changes: Partial<IJob>) {
        await db.jobs.update(id, changes);
    }

    async deleteJob(id: number) {
        await db.jobs.delete(id);
    }
}

export default new JobService();