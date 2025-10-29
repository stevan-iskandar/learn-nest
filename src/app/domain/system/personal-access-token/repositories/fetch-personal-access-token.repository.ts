import { PersonalAccessToken } from "../entities/personal-access-token.entity"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { EntityNotFoundError, FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm"

@Injectable()
export class FetchPersonalAccessTokenRepository {
  constructor(
    @InjectRepository(PersonalAccessToken)
    private readonly personalAccessTokenRepository: Repository<PersonalAccessToken>,
  ) { }

  async findById(id: number, relations?: FindOptionsRelations<PersonalAccessToken>): Promise<PersonalAccessToken> {
    const where: FindOptionsWhere<PersonalAccessToken> = { id }
    const result = await this.personalAccessTokenRepository.findOne({
      where,
      relations,
    })

    if (!result) throw new EntityNotFoundError(PersonalAccessToken, where)

    return result
  }
}