import { IsString, IsNumber, Min, Max, IsLatitude, IsLongitude, MAX } from "class-validator";

export class GetEstimateDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2022)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number;

}