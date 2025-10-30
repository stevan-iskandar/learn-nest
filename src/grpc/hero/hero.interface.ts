import { Observable } from "rxjs"

export interface HeroService {
  findOne: (data: HeroById) => Observable<Hero>
}

export interface Hero {
  id: number
  name: string
}

export interface HeroById {
  id: number
}