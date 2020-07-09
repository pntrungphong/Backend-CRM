import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { LeadFileEntity } from './lead-file.entity';
@EntityRepository(LeadFileEntity)
export class FileLeadRepository extends AbstractRepository<LeadFileEntity> {
    public async create(idFile: string, idLead: string) {
        const leadFile = this.repository.create({ idFile, idLead });
        return this.repository.save(leadFile);
    }

    public async getByIdLead(idLead: string) {
        return this.repository.find({ idLead });
    }
}
