import { Injectable } from '@nestjs/common';

import { ContactReferralDto } from '../dto/contact-referral/ContactReferralDto';
import { ContactReferralRepository } from '../repository/referral.repository';
@Injectable()
export class ContactReferralService {
    constructor(
        public readonly contactReferralRepository: ContactReferralRepository,
    ) {}
    async create(
        createContactReferralDto: ContactReferralDto[],
        idSource: string,
    ): Promise<void> {
        for await (const contactReferral of createContactReferralDto) {
            const contactReferralObj = Object.assign(contactReferral, {
                idSource,
                hashtag: JSON.stringify(contactReferral.hashtag),
            });
            const contactReferralCompany = this.contactReferralRepository.create(
                { ...contactReferralObj },
            );
            await this.contactReferralRepository.save(contactReferralCompany);
        }
    }

    async update(
        updateDto: ContactReferralDto[],
        idContact: string,
    ): Promise<void> {
        const relations = await this.contactReferralRepository.find({
            idSource: idContact,
        });
        await this.contactReferralRepository.remove(relations);
        const contactClean = updateDto.map((it) => ({
            idTarget: it.idTarget,
            hashtag: it.hashtag,
        }));
        await this.create(contactClean, idContact);
    }
}
