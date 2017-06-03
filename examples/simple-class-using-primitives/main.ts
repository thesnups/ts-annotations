import { ObjectMapper } from 'ts-annotations';
import { Account } from './account.class';
import { accountSample } from '../account-sample';

const mapper = new ObjectMapper();
const account = mapper.readValue<Account>(accountSample, Account);