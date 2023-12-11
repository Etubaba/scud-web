import React from "react";
import Layout from "../../components/riderLayout/Layout";
import EmptyPromotion from "../../components/ridersComponent/EmptyPromotion";
import Promotion from "../../components/ridersComponent/Promotion";
import { promotion } from "../../dummy";

const Promotions = () => {
  const colors = ["scudGreen", "green-600", "red-600"];
  return (
    <div className="p-10">
      <div className="mb-7">
        <p className="font-semibold   text-lg tracking-wider">Promotions</p>
        <p>
          Promotions are only use for booking of rides, they are not
          withdrawable
        </p>
      </div>

      {promotion?.length === 0 ? (
        <EmptyPromotion />
      ) : (
        promotion?.map((promo, index) => (
          <Promotion
            key={index}
            text={promo?.title}
            subtitle={promo?.subtitle}
            validity={promo?.validity}
            discount={promo?.discount}
            color={colors.length > index ? colors[index] : "scudGreen"}
          />
        ))
      )}
    </div>
  );
};

Promotions.getLayout = Layout;
export default Promotions;
