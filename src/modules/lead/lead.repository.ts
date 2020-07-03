import { AbstractRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { UserEntity } from '../user/user.entity';
import { LeadDto } from './dto/LeadDto';
import { LeadUpdateDto } from './dto/LeadUpdateDto';
import { LeadEntity } from './lead.entity';
@EntityRepository(LeadEntity)
export class LeadRepository extends AbstractRepository<LeadEntity> {
    public async create(
        user: UserEntity,
        createDto: LeadUpdateDto,
    ): Promise<LeadEntity> {
        const leadObj = Object.assign(createDto, {
            createdBy: user.id,
            updatedBy: user.id,
        });
        const lead = this.repository.create({ ...leadObj });
        return this.repository.save(lead);
    }

    public async getLeadById(id: string): Promise<LeadDto> {
        const leadInfo = await this.repository.findOne({
            where: { id },
        });
        console.table(leadInfo);
        return leadInfo.toDto() as LeadDto;
    }
}
