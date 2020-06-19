import './boilerplate.polyfill';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { MathModule } from './modules/math/math.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { Company } from 'modules/company/company.model';

@Module({
    imports: [
        AuthModule,
        UserModule,
        MathModule,
        CompanyModule,
        TypeOrmModule.forRootAsync({
            imports: [SharedModule, CompanyModule],
            useFactory: (configService: ConfigService) =>
                configService.typeOrmConfig,
            inject: [ConfigService],
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
