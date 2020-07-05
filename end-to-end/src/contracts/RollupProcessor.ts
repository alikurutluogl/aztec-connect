import BN from "bn.js";
import { Address } from "web3x/address";
import { EventLog, TransactionReceipt } from "web3x/formatters";
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from "web3x/contract";
import { Eth } from "web3x/eth";
import abi from "./RollupProcessorAbi";
export type DepositEvent = {
    depositorAddress: Address;
    depositValue: string;
};
export type RollupProcessedEvent = {
    rollupId: string;
    dataRoot: string;
    nullRoot: string;
};
export type WithdrawEvent = {
    withdrawAddress: Address;
    withdrawValue: string;
};
export interface DepositEventLog extends EventLog<DepositEvent, "Deposit"> {
}
export interface RollupProcessedEventLog extends EventLog<RollupProcessedEvent, "RollupProcessed"> {
}
export interface WithdrawEventLog extends EventLog<WithdrawEvent, "Withdraw"> {
}
interface RollupProcessorEvents {
    Deposit: EventSubscriptionFactory<DepositEventLog>;
    RollupProcessed: EventSubscriptionFactory<RollupProcessedEventLog>;
    Withdraw: EventSubscriptionFactory<WithdrawEventLog>;
}
interface RollupProcessorEventLogs {
    Deposit: DepositEventLog;
    RollupProcessed: RollupProcessedEventLog;
    Withdraw: WithdrawEventLog;
}
interface RollupProcessorTxEventLogs {
    Deposit: DepositEventLog[];
    RollupProcessed: RollupProcessedEventLog[];
    Withdraw: WithdrawEventLog[];
}
export interface RollupProcessorTransactionReceipt extends TransactionReceipt<RollupProcessorTxEventLogs> {
}
interface RollupProcessorMethods {
    dataRoot(): TxCall<string>;
    dataSize(): TxCall<string>;
    latestRollupId(): TxCall<string>;
    linkedToken(): TxCall<Address>;
    nullRoot(): TxCall<string>;
    processRollup(proofData: string, viewingKeys: string): TxSend<RollupProcessorTransactionReceipt>;
    rootRoot(): TxCall<string>;
    scalingFactor(): TxCall<string>;
    verifier(): TxCall<Address>;
}
export interface RollupProcessorDefinition {
    methods: RollupProcessorMethods;
    events: RollupProcessorEvents;
    eventLogs: RollupProcessorEventLogs;
}
export class RollupProcessor extends Contract<RollupProcessorDefinition> {
    constructor(eth: Eth, address?: Address, options?: ContractOptions) {
        super(eth, abi, address, options);
    }
    deploy(_linkedToken: Address, _scalingFactor: number | string | BN): TxSend<RollupProcessorTransactionReceipt> {
        return super.deployBytecode("0x60806040527f1df6bde50516dd1201088fd8dda84c97eda5652428d1c7e86af529cc5e0eb8216000557f152175cffcb23dfbd80262802e32efe7db5fdcb91ba0a0527ab1ffb323bf3fc06001557f1b22ef607ae08588bc83a79ffacec507347bd2dee44c846181b7051285c32c0a60025534801561007c57600080fd5b506040516110293803806110298339818101604052604081101561009f57600080fd5b5080516020909101516001600160a01b038216610103576040805162461bcd60e51b815260206004820152601e60248201527f526f6c6c75702050726f636573736f723a205a45524f5f414444524553530000604482015290519081900360640190fd5b8061013f5760405162461bcd60e51b81526004018080602001828103825260258152602001806110046025913960400191505060405180910390fd5b600680546001600160a01b0319166001600160a01b038416179055600781905560405161016b906101b0565b604051809103906000f080158015610187573d6000803e3d6000fd5b50600580546001600160a01b0319166001600160a01b0392909216919091179055506101bd9050565b61010880610efc83390190565b610d30806101cc6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80636dff3584116100665780636dff3584146100e657806394401d75146100ee578063ea12489f146100f6578063ed3437f8146100fe578063f81cccbe1461010657610093565b80632b7ac3f3146100985780633248295f146100bc57806349ce468d146100d65780636ad73ffe146100de575b600080fd5b6100a06101ca565b604080516001600160a01b039092168252519081900360200190f35b6100c46101d9565b60408051918252519081900360200190f35b6100c46101df565b6100c46101e5565b6100c46101eb565b6100c46101f1565b6100a06101f7565b6100c4610206565b6101c86004803603604081101561011c57600080fd5b81019060208101813564010000000081111561013757600080fd5b82018360208201111561014957600080fd5b8035906020019184600183028401116401000000008311171561016b57600080fd5b91939092909160208101903564010000000081111561018957600080fd5b82018360208201111561019b57600080fd5b803590602001918460018302840111640100000000831117156101bd57600080fd5b50909250905061020c565b005b6005546001600160a01b031681565b60025481565b60035481565b60045481565b60005481565b60015481565b6006546001600160a01b031681565b60075481565b60008060008060008060008060006102598d8d8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061051492505050565b98509850985098509850985098509850985060005487146102ab5760405162461bcd60e51b8152600401808060200182810382526025815260200180610ca96025913960400191505060405180910390fd5b60015485146102eb5760405162461bcd60e51b8152600401808060200182810382526025815260200180610c846025913960400191505060405180910390fd5b600254831461032b5760405162461bcd60e51b8152600401808060200182810382526025815260200180610c3e6025913960400191505060405180910390fd5b60045461033f90600163ffffffff61055416565b891461037c5760405162461bcd60e51b8152600401808060200182810382526023815260200180610bf76023913960400191505060405180910390fd5b600081116103d1576040805162461bcd60e51b815260206004820181905260248201527f526f6c6c75702050726f636573736f723a204e554d5f54585f49535f5a45524f604482015290519081900360640190fd5b600560009054906101000a90046001600160a01b03166001600160a01b0316638e760afe8e8e6040518363ffffffff1660e01b815260040180806020018281038252848482818152602001925080828437600081840152601f19601f8201169050808301925050509350505050602060405180830381600087803b15801561045857600080fd5b505af115801561046c573d6000803e3d6000fd5b505050506040513d602081101561048257600080fd5b810190808051906020019092919050505050600061012090506104b68e8e839080926104b093929190610bce565b846105b7565b6000879055600185905560048a90556002839055604080518881526020810187905281518c927f3c97566e12414751fced170b59d5276f9ceac1c6696f683856af07d0a6c75b23928290030190a25050505050505050505050505050565b602081015160408201516060830151608084015160a085015160c086015160e0870151610100880151610120909801519698959794969395929491939092565b6000828201838110156105ae576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b90505b92915050565b61012060005b8281101561064e5760006105d7828463ffffffff61065516565b905060006105eb828563ffffffff61055416565b90503660006105fc83858a8c610bce565b9150915061063f82828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506106ae92505050565b505050506001810190506105bd565b5050505050565b600082610664575060006105b1565b8282028284828161067157fe5b04146105ae5760405162461bcd60e51b8152600401808060200182810382526021815260200180610c636021913960400191505060405180910390fd5b602081015160408201516101208301516000828411156106fc576007546106eb906106df868663ffffffff61072716565b9063ffffffff61065516565b90506106f78183610769565b61064e565b8383111561064e5760075461071b906106df858763ffffffff61072716565b905061064e8183610959565b60006105ae83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610b37565b6001600160a01b0381166107c4576040805162461bcd60e51b815260206004820152601e60248201527f526f6c6c75702050726f636573736f723a205a45524f5f414444524553530000604482015290519081900360640190fd5b60065460408051636eb1769f60e11b81526001600160a01b0384811660048301523060248301529151600093929092169163dd62ed3e91604480820192602092909190829003018186803b15801561081b57600080fd5b505afa15801561082f573d6000803e3d6000fd5b505050506040513d602081101561084557600080fd5b50519050828110156108885760405162461bcd60e51b815260040180806020018281038252602d815260200180610cce602d913960400191505060405180910390fd5b600654604080516323b872dd60e01b81526001600160a01b03858116600483015230602483015260448201879052915191909216916323b872dd9160648083019260209291908290030181600087803b1580156108e457600080fd5b505af11580156108f8573d6000803e3d6000fd5b505050506040513d602081101561090e57600080fd5b5050604080516001600160a01b03841681526020810185905281517fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c929181900390910190a1505050565b6001600160a01b0381166109b4576040805162461bcd60e51b815260206004820152601e60248201527f526f6c6c75702050726f636573736f723a205a45524f5f414444524553530000604482015290519081900360640190fd5b600654604080516370a0823160e01b815230600482015290516000926001600160a01b0316916370a08231916024808301926020929190829003018186803b1580156109ff57600080fd5b505afa158015610a13573d6000803e3d6000fd5b505050506040513d6020811015610a2957600080fd5b5051905080831115610a6c5760405162461bcd60e51b8152600401808060200182810382526024815260200180610c1a6024913960400191505060405180910390fd5b6006546040805163a9059cbb60e01b81526001600160a01b038581166004830152602482018790529151919092169163a9059cbb9160448083019260209291908290030181600087803b158015610ac257600080fd5b505af1158015610ad6573d6000803e3d6000fd5b505050506040513d6020811015610aec57600080fd5b5050604080516001600160a01b03841681526020810185905281517f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364929181900390910190a1505050565b60008184841115610bc65760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b8b578181015183820152602001610b73565b50505050905090810190601f168015610bb85780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60008085851115610bdd578182fd5b83861115610be9578182fd5b505082019391909203915056fe526f6c6c75702050726f636573736f723a2049445f4e4f545f53455155454e5449414c526f6c6c75702050726f636573736f723a20494e53554646494349454e545f46554e4453526f6c6c75702050726f636573736f723a20494e434f52524543545f524f4f545f524f4f54536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77526f6c6c75702050726f636573736f723a20494e434f52524543545f4e554c4c5f524f4f54526f6c6c75702050726f636573736f723a20494e434f52524543545f444154415f524f4f54526f6c6c75702050726f636573736f723a20494e53554646494349454e545f544f4b454e5f415050524f56414ca26469706673582212204ecd3d1107b70b623e199982591720ed6772e961ab3e451cf68da415cc7f4de564736f6c634300060a0033608060405234801561001057600080fd5b5060e98061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80638e760afe14602d575b600080fd5b609760048036036020811015604157600080fd5b810190602081018135640100000000811115605b57600080fd5b820183602082011115606c57600080fd5b80359060200191846001830284011164010000000083111715608d57600080fd5b50909250905060ab565b604080519115158252519081900360200190f35b60019291505056fea26469706673582212205340330a2562ea4e6df8fbb2f158d5de20132d272f5333b06072f0c4c92b7dd064736f6c634300060a0033526f6c6c75702050726f636573736f723a205a45524f5f5343414c494e475f464143544f52", _linkedToken, _scalingFactor) as any;
    }
}
export var RollupProcessorAbi = abi;
