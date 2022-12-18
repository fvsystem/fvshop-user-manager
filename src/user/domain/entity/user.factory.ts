import { v4 as uuid } from 'uuid';
import { UserEntity, UserProps } from '@root';
import { UniqueEntityId } from '@fvsystem/fvshop-shared-entities';

export class UserEntityFactory {
  static create(props: UserProps, id?: string) {
    const idValue = id || uuid();
    const uniqueEntityId = new UniqueEntityId(idValue);
    return new UserEntity(props, uniqueEntityId);
  }
}
