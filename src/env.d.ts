/// <reference types="astro/client" />

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

interface ethers {
    providers?: any;
}