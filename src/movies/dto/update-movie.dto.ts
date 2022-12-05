import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movies.dto';
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

// title 뒤에 ?붙이면 필수가 아니다 undefined가 될수도 있다는 의미
// mapped-types는 타입을 변환시키고 사용할 수 있게 하는 패키지이다.
// PartialType은 참고할만한 DTO 레퍼런스가 필요하다
