import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserEntity } from '../users/users.entity';
import { AuthGuard } from '../guards/auth.guards';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Post('/create')
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
        return this.reportsService.create(body, user);
        
    }
}
