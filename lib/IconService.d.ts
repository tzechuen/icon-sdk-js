import BigNumber from "bignumber.js";
import Wallet from "./Wallet";
import SignedTransaction from "./SignedTransaction";
import * as Validator from "./data/Validator";
import * as Util from "./data/Util";
import Amount from "./data/Amount";
import * as Converter from "./data/Converter";
import HttpProvider from "./transport/http/HttpProvider";
import * as Hexadecimal from "./data/Hexadecimal";
import HttpCall from "./transport/http/client/HttpCall";
import Block from "./data/Formatter/Block";
import ScoreApiList from "./data/Formatter/ScoreApiList";
import Transaction from "./data/Formatter/Transaction";
import TransactionResult from "./data/Formatter/TransactionResult";
import { Call } from "./builder/call/Call";
import { IcxTransaction } from "./builder/transaction/IcxTransaction";
import { MessageTransaction } from "./builder/transaction/MessageTransaction";
import { DepositTransaction } from "./builder/transaction/DepositTransaction";
import { DeployTransaction } from "./builder/transaction/DeployTransaction";
import { CallTransaction } from "./builder/transaction/CallTransaction";
/**
 * Class which provides APIs of ICON network.
 */
export default class IconService {
    static IconAmount: typeof Amount;
    static IconBuilder: {
        CallBuilder: typeof import("./builder/call/Call").CallBuilder;
        IcxTransactionBuilder: typeof import("./builder/transaction/IcxTransaction").IcxTransactionBuilder;
        CallTransactionBuilder: typeof import("./builder/transaction/CallTransaction").CallTransactionBuilder;
        DeployTransactionBuilder: typeof import("./builder/transaction/DeployTransaction").default;
        MessageTransactionBuilder: typeof import("./builder/transaction/MessageTransaction").default;
        DepositTransactionBuilder: typeof import("./builder/transaction/DepositTransaction").default;
    };
    static IconConverter: typeof Converter;
    static IconWallet: typeof Wallet;
    static IconUtil: typeof Util;
    static SignedTransaction: typeof SignedTransaction;
    static HttpProvider: typeof HttpProvider;
    static IconHexadecimal: typeof Hexadecimal;
    static IconValidator: typeof Validator;
    private provider;
    /**
     * Creates an instance of IconService.
     * @param {HttpProvider} provider - The HttpProvider instance.
     */
    constructor(provider: HttpProvider);
    /**
     * Get the total number of issued coins.
     * @return {HttpCall} The HttpCall instance for icx_getTotalSupply JSON-RPC API request.
     */
    getTotalSupply(): HttpCall<BigNumber>;
    /**
     * Get the balance of the address.
     * @param {string} address - The EOA or SCORE address.
     * @return {HttpCall} The HttpCall instance for icx_getBalance JSON-RPC API request.
     */
    getBalance(address: string): HttpCall<BigNumber>;
    /**
     * Get the block information.
     * @param {string|BigNumber} value - The height or hash value of block.
     * @return {HttpCall} The HttpCall instance for icx_getBlockByHeight,
     *   icx_getBlockByHash or icx_getLastBlock JSON-RPC API request.
     */
    getBlock(value: string | BigNumber): HttpCall<Block>;
    /**
     * @description Get the block information.
     * @param {BigNumber} value The value of block number
     * @return {object} The Block object
     */
    getBlockByHeight(value: BigNumber): HttpCall<Block>;
    /**
     * @description Get the block information.
     * @param {string} value The value of block hash
     * @return {object} The Block object
     */
    getBlockByHash(value: string): HttpCall<Block>;
    /**
     * @description Get the last block information.
     * @return {object} The Block object
     */
    getLastBlock(): HttpCall<Block>;
    /**
     * @description Get the SCORE API list.
     * @param {string} address SCORE address
     * @return {array} The list of SCORE API
     */
    getScoreApi(address: string): HttpCall<ScoreApiList>;
    /**
     * Get the transaction information.
     * @param {string} hash - The transaction hash.
     * @return {HttpCall} The HttpCall instance for icx_getTransactionByHash JSON-RPC API request.
     */
    getTransaction(hash: string): HttpCall<Transaction>;
    /**
     * Get the result of transaction by transaction hash.
     * @param {string} hash - The transaction hash.
     * @return {HttpCall} The HttpCall instance for icx_getTransactionResult JSON-RPC API request.
     */
    getTransactionResult(hash: string): HttpCall<TransactionResult>;
    /**
     * Send a transaction that changes the states of address.
     * @param {SignedTransaction} signedTransaction - Parameters including signature.
     * @return {HttpCall} The HttpCall instance for icx_sendTransaction JSON-RPC API request.
     */
    sendTransaction(signedTransaction: SignedTransaction): HttpCall<string>;
    /**
     * Returns an estimated step of how much step is necessary to allow the transaction to complete.
     * @param {SignedTransaction} transaction - Parameters
     * @return {HttpCall} The HttpCall instance for debug_estimateStep JSON-RPC API request.
     */
    estimateStep(transaction: IcxTransaction | MessageTransaction | DepositTransaction | DeployTransaction | CallTransaction): HttpCall<BigNumber>;
    /**
     * Calls a SCORE API just for reading.
     * @param {Call} call - The call instance exported by CallBuilder
     * @return {HttpCall} The HttpCall instance for icx_call JSON-RPC API request.
     */
    call(call: Call): HttpCall<any>;
    /**
     * Get the transaction trace.
     * @param {string} hash - The transaction hash.
     * @return {HttpCall} The HttpCall instance for debug_getTrace JSON-RPC API request.
     */
    getTrace(hash: string): HttpCall<any>;
}
