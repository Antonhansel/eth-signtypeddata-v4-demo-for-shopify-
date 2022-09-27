import "./styles.css";
import * as sigUtil from "eth-sig-util";
import * as ethUtil from "ethereumjs-util";
import typedDataV4 from "./typedDataV4";
/*
https://docs.metamask.io/guide/signing-data.html#sign-typed-data-v4
*/

window.sigUtil = sigUtil;
window.ethUtil = ethUtil;

const provider = window.ethereum;

const msgParams = JSON.stringify(typedDataV4);

function providerRequest(method, params = [], options = {}) {
  const payload = {
    method,
    params,
    ...options
  };
  console.log(`window.ethereum.request(${JSON.stringify(payload)})
  .then(console.log)
  `);
  return provider.request(payload);
}

function eth_signTypedData_v4(event) {
  const from = "0xd5eb996ca613ebfc9c32d3aed786b46fe9ed0c21";

  const params = [from, msgParams];
  const method = "eth_signTypedData_v4";

  try {
    const test = provider.request(
      {
        method,
        params,
        from
      },
      function (err, result) {
        console.log("HERE ?", err, result);
        if (err) return console.log(JSON.stringify(err));
        if (result.error) {
          console.log(JSON.stringify(result));
          return;
        }
        console.log("TYPED SIGNED:" + JSON.stringify(result.result));

        const recovered = sigUtil.recoverTypedSignature_v4({
          data: JSON.parse(msgParams),
          sig: result.result
        });

        if (
          ethUtil.toChecksumAddress(recovered) ===
          ethUtil.toChecksumAddress(from)
        ) {
          alert("Successfully recovered signer as " + from);
        } else {
          alert(
            "Failed to verify signer when comparing " + result + " to " + from
          );
        }
      }
    );
    return test;
  } catch (e) {
    console.log("Error", e);
  }
}

function eth_accounts() {
  return providerRequest("eth_accounts");
}

function eth_requestAccounts() {
  return providerRequest("eth_requestAccounts");
}

function metamask_getProviderState() {
  return providerRequest("metamask_getProviderState");
}

function eth_chainId() {
  return providerRequest("eth_chainId");
}

const methodsList = {
  eth_requestAccounts,
  eth_accounts,
  eth_signTypedData_v4,
  metamask_getProviderState,
  eth_chainId
};

export default function App() {
  return (
    <div className="App">
      <h1>eth_signTypedData_v4 Shopify demo</h1>
      provider: Ethereum
      {Object.entries(methodsList).map(([k, v]) => {
        return (
          <p key={k}>
            <button
              onClick={() => {
                v().then((res) => {
                  console.log(`------- ethereum.${k} -------`);
                  console.log(JSON.stringify(res));
                });
              }}
            >
              {k}
            </button>
          </p>
        );
      })}
    </div>
  );
}
