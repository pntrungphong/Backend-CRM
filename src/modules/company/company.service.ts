import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { FileNotImageException } from '../../exceptions/file-not-image.exception';
import { IFile } from '../../interfaces/IFile';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
//import { CompanyRegisterDto } from '../auth/dto/CompanyRegisterDto';
import { CompanysPageDto } from './dto/CompanysPageDto';
import { CompanysPageOptionsDto } from './dto/CompanysPageOptionsDto';
import { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import { Company } from './company.model';

@Injectable()
export class CompanyService {

    private companys: Company[] = [];
    insertCompany(name: string, url: string) {
        const newCompany = new Company(name, url);
        this.companys.push(newCompany);
        return name;
      }
    // async createCompany( 
    //     companyRegisterDto: CompanyRegisterDto,
    //     file: IFile,
    // ): Promise<CompanyEntity> {
        
    //     const company = this.companyRepository.create({...companyRegisterDto});

    //     return this.companyRepository.save(company);
    // }
    getCompany(){
        return {
            name: 'GEEK Up',
            url:  'www.geekup.vn'
        }
    }

    getComapnys() {
        // this.companys.forEach(element => {
        //   return [...element.name];
        // });
        return [...this.companys];
      }

      


    // async getCompanys(pageOptionsDto: CompanysPageOptionsDto): Promise<CompanysPageDto> {
    //     const queryBuilder = this.companyRepository.createQueryBuilder('company');
    //     const [companys, companysCount] = await queryBuilder
    //         .skip(pageOptionsDto.skip)
    //         .take(pageOptionsDto.take)
    //         .getManyAndCount();

    //     const pageMetaDto = new PageMetaDto({
    //         pageOptionsDto,
    //         itemCount: companysCount,
    //     });
    //     return new CompanysPageDto(companys.toDtos(), pageMetaDto);
    // }
}
