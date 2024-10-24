import {
  reactExtension,
  useBuyerJourneyIntercept,
  useTotalAmount,
  useAppliedGiftCards
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const {amount} = useTotalAmount();
  const appliedGiftCards = useAppliedGiftCards();


  let checkoutOrderValue = amount;
  appliedGiftCards.length>0 && appliedGiftCards.forEach((card)=>{
    checkoutOrderValue -= card.amountUsed.amount
  })

  useBuyerJourneyIntercept(() => {
    if(checkoutOrderValue < 500) {
      return {
        behavior: 'block',
        reason: 'Order value is less than 500',
        errors: [
          {
            target: 'purchase.checkout.block.render',
            message: 'Order value is less than 500'
          }
        ]
      };
    } else {
      return { behavior: 'allow' };
    }
  });

  return null;
}