import { Body, Controller, Post, UseGuards , Param, Patch} from '@nestjs/common';
import { UserEntity } from '../users/users.entity';
import { AuthGuard } from '../guards/auth.guards';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';


@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Post('/create')
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
        return this.reportsService.create(body, user);
        
    };

    @Patch('/:id')
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto ) {
     return  this.reportsService.changeApproval(id, body.approved)
    }

}
