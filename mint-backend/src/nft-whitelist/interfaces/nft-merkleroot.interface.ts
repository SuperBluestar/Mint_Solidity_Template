export interface INftMerkleRoot {
    merkleroot: string;
    addressCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface INftMerkleProof {
    walletAddress: string
}