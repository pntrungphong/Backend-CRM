import { Injectable } from '@nestjs/common';

import { ContactReferralDto } from './dto/ContactReferralDto';
import { ContactReferralRepository } from './referral.repository';
@Injectable()
export class ContactReferralService {
    constructor(
        public readonly contactreferralRepository: ContactReferralRepository,
    ) {}
    async create(
        createContactReferralDto: ContactReferralDto[],
        idSource: string,
    ): Promise<void> {
        for await (const contactReferral of createContactReferralDto) {
            const contactReferralObj = Object.assign(contactReferral, {
                idSource,
                hastag: JSON.stringify(contactReferral.hastag),
            });
            const contactReferralCompany = this.contactreferralRepository.create(
                { ...contactReferralObj },
            );
            await this.contactreferralRepository.save(contactReferralCompany);
        }
    }

    async update(
        updateDto: ContactReferralDto[],
        idContact: string,
    ): Promise<void> {
        const relations = await this.contactreferralRepository.find({
            idSource: idContact,
        });
        await this.contactreferralRepository.remove(relations);
        const contactClean = updateDto.map((it) => ({
            idTarget: it.idTarget,
            hastag: it.hastag,
        }));
        await this.create(contactClean, idContact);
    }
}
