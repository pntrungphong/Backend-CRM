import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


import { ContactReferralDto } from './dto/ContactReferralDto';
import { ContactReferralRepository } from './contactreferral.repository';
@Injectable()
export class ContactReferralService {
    constructor(public readonly contactreferralRepository: ContactReferralRepository) {}
    async create(
        createContactReferralDto: ContactReferralDto[],
        idContact: string,
    ) {
        for await (const contactReferral of createContactReferralDto) {
            const contactReferralObj = Object.assign({
                ...contactReferral, 
                idContact,
            });
            const contactReferralCompany = this.contactreferralRepository.create({ ...contactReferralObj});
            this.contactreferralRepository.save(contactReferralCompany);
        } 
        
    }



    // async findById(id: string): Promise<CompanyDto> {
    //     const company = await this.companyRepository.findOne({
    //         where: { id },
    //     });
    //     if (!company) {
    //         throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    //     }
    //     return company.toDto() as CompanyDto;
    // }

    // async findByName(
    //     name: string,
    //     pageOptionsDto: CompaniesPageOptionsDto,
    // ): Promise<CompaniesPageDto> {
    //     const queryBuilder = this.companyRepository
    //         .createQueryBuilder('company')
    //         .where('(company.name = :name)')
    //         .setParameters({ name });

    //     const [companies, companiesCount] = await queryBuilder
    //         .skip(pageOptionsDto.skip)
    //         .take(pageOptionsDto.take)
    //         .getManyAndCount();

    //     const pageMetaDto = new PageMetaDto({
    //         pageOptionsDto,
    //         itemCount: companiesCount,
    //     });
    //     return new CompaniesPageDto(companies.toDtos(), pageMetaDto);
    // }

    // async update(
    //     id: string,
    //     updateDto: UpdateCompanyDto,
    //     user: UserEntity,
    // ): Promise<CompanyEntity> {
    //     const company = await this.companyRepository.findOne({
    //         where: { id },
    //     });
    //     if (!company) {
    //         throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    //     }
    //     const updatedCompany = Object.assign(company, {
    //         ...updateDto,
    //         email: updateDto.email.join('|'),
    //         phone: updateDto.phone.join('|'),
    //         address: updateDto.address.join('|'),
    //         url: updateDto.url.join('|'),
    //         updated_by: user.id,
    //     });

    //     return this.companyRepository.save(updatedCompany);
    // }
}
