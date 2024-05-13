import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVideoDto extends PartialType(CreateVideoDto) { }


export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    video: any;
}

export class FilesUploadDto {
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    files: any[];
  }
  