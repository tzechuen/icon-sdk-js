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
import { Hash } from "./types/hash";
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
     * @param {Hash} [height] - block Height.
     * @return {HttpCall} The HttpCall instance for icx_getTotalSupply JSON-RPC API request.
     */
    getTotalSupply(height?: Hash): HttpCall<BigNumber>;
    /**
     * Get the balance of the address.
     * @param {string} address - The EOA or SCORE address.
     * @param {Hash} [height] - block Height.
     * @return {HttpCall} The HttpCall instance for icx_getBalance JSON-RPC API request.
     */
    getBalance(address: string, height?: Hash): HttpCall<BigNumber>;
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
     * @param {Hash} [height] block Height
     * @return {array} The list of SCORE API
     */
    getScoreApi(address: string, height?: Hash): HttpCall<ScoreApiList>;
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
     * sends a transaction like `icx_sendTransaction`, then it will wait for the
     result of it for specified time.  If the timeout isn't set by user, it uses
     `defaultWaitTimeout` of icon node.
     * @param {SignedTransaction} signedTransaction - Parameters including signature.
     * @return {HttpCall} The HttpCall instance for icx_sendTransaction JSON-RPC API request.
     */
    sendTransactionAndWait(signedTransaction: SignedTransaction): HttpCall<string>;
    /**
     * It will wait for the result of the transaction for specified time.
     * If the timeout isn't set by user, it uses `defaultWaitTimeout` of icon node.
     * @param {string} hash - The transaction hash.
     * @return {HttpCall} The HttpCall instance for icx_getTransactionResult JSON-RPC API request.
     */
    waitTransactionResult(hash: string): HttpCall<TransactionResult>;
    /**
     * Get data by hash.
     It can be used to retrieve data based on the hash algorithm (SHA3-256).
     Following data can be retrieved by a hash.
  
     * BlockHeader with the hash of the block
     * Validators with BlockHeader.NextValidatorsHash
     * Votes with BlockHeader.VotesHash
     * etc…
     * @param {string} hash - The hash value of the data to retrieve
     * @return {HttpCall} The HttpCall instance for icx_getTransactionResult JSON-RPC API request.
     */
    getDataByHash(hash: string): HttpCall<TransactionResult>;
    /**
     * Get block header for specified height.
     * @param {BigNumber | string} height - The height of the block.
     * @return {HttpCall} The HttpCall instance for icx_getTransactionResult JSON-RPC API request.
     */
    getBlockHeaderByHeight(height: string | BigNumber): HttpCall<TransactionResult>;
    /**
     * Get votes for the block specified by height.
     * @param {BigNumber} height - The height of the block.
     * @return {HttpCall} The HttpCall instance for icx_getTransactionResult JSON-RPC API request.
     */
    getVotesByHeight(height: string | BigNumber): HttpCall<TransactionResult>;
    /**
     * Get proof for the receipt
     * @param {string} hash - The hash value of the block including the result
     * @param {string} index - Index of the receipt in the block
     * @return {HttpCall} The HttpCall instance for icx_getTransactionResult JSON-RPC API request.
     */
    getProofForResult(hash: string, index: string | BigNumber): HttpCall<TransactionResult>;
    /**
     * Get proof for the receipt and the events in it
     * @param {string} hash - The hash value of the block including the result
     * @param index - Index of the receipt in the block
     * @param events - List of indexes of the events in the receipt
     * @return {HttpCall} The HttpCall instance for icx_getTransactionResult JSON-RPC API request.
     */
    getProofForEvents(hash: string, index: string | BigNumber, events: Array<string | BigNumber>): HttpCall<TransactionResult>;
    /**
     * Get the transaction trace.
     * @param {string} hash - The transaction hash.
     * @return {HttpCall} The HttpCall instance for debug_getTrace JSON-RPC API request.
     */
    getTrace(hash: string): HttpCall<any>;
}
