import React from 'react';
import styled from 'styled-components';

import NumberInput from 'shared/components/bookingForm/numberInput';
import StyledTextField from 'shared/styles/styledTextField';
import StyledBlock from 'shared/styles/styledBlock';
import HoverNotes from 'shared/components/hoverNotes';
import DeleteIcon from 'shared/components/icons/delete';
import { StyledButtonInBlock } from 'shared/styles/styledButton';
import { validateItemDescription, validateItemBoxes, validateTotalBox, validateTotalQuantity, validateItemVolume, validateItemWeight } from 'shared/components/bookingForm/validations';
import ItemIcon from 'shared/components/icons/box';
import AccessoriesIcon from 'shared/components/icons/accessories';
import { colors, screen } from 'shared/styles/variables';

const ItemsForm = ({
    addItem,
    editItem,
    deleteItem,
    items,
    type,
    displayError,
    itemLimit,
    duplicateItem,
    volumeRequired,
}) => {
    const validateTotal = type === 'ITEMS' ? {
        quantity: validateTotalQuantity(items, itemLimit.quantities),
        box: validateTotalBox(items, itemLimit.boxes),
    } : {};
    const editItemDesc = (v, item, i) => editItem({ ...item, description: v }, i);
    const editItemQuantity = (v, item, i) => editItem({ ...item, quantity: v }, i);
    const editItemBoxes = (v, item, i) => editItem({ ...item, boxes: v }, i);
    const editItemVolume = (v, item, i) => editItem({ ...item, volume: v }, i);
    const editItemWeight = (v, item, i) => editItem({ ...item, weight: v }, i);
    return (
        <StyledBlock>
            <h3 className="title">
                { type === 'ITEMS' && <ItemIcon color={colors.gray} />}
                { type === 'ACCESSORIES' && <AccessoriesIcon color={colors.gray} />}
                <span>{type}</span>
            </h3>
            { type === 'ACCESSORIES' && <HoverNotes notes={'this is notes. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'} /> }
            <StyledItems>
                {items.map((item, index) => (
                    <div className="item" key={`${type}_${index}`}>
                        <div className="item--description">
                            <StyledTextField
                                id={`${type}_${index}_description`}
                                label="Description"
                                type="text"
                                onChange={e => editItemDesc(e.target.value, item, index)}
                                value={item.description}
                                error={displayError && !validateItemDescription(item.description, item.quantity)}
                            />
                        </div>
                        <div className="item--boxes">
                            <NumberInput
                                id={`${type}_${index}_boxes`}
                                label="Boxes/ cartons/ pieces"
                                handleChange={v => editItemBoxes(v, item, index)}
                                value={item.boxes}
                                error={displayError && !validateItemBoxes(item.boxes)}
                                step={1}
                            />
                        </div>
                        <div className="item--volume">
                            <NumberInput
                                id={`${type}_${index}_volume`}
                                label="Volume (m3)"
                                handleChange={v => editItemVolume(v, item, index)}
                                value={item.volume}
                                error={displayError && volumeRequired && !validateItemVolume(item.volume)}
                                step={0.1}
                            />
                        </div>
                        <div className="item--weight">
                            <NumberInput
                                id={`${type}_${index}_weight`}
                                label="Weight (kg)"
                                handleChange={v => editItemWeight(v, item, index)}
                                value={item.weight}
                                step={5}
                            />
                        </div>
                        { (items.length > 1 || type === 'ACCESSORIES') && 
                            <button
                                onClick={e => deleteItem(index)}
                                className="item--delete"
                            ><DeleteIcon color={colors.red} /></button>
                        }
                    </div>
                ))}
                <div className="buttons">
                    <StyledButtonInBlock onClick={e => addItem()}>
                        { type === 'ITEMS'? 'Add Item': 'Add Accessory'}
                    </StyledButtonInBlock>
                    { type === 'ITEMS' &&
                        <StyledButtonInBlock onClick={e => duplicateItem()}>
                            Duplicate Item
                        </StyledButtonInBlock>
                    }
                </div>
                { type === 'ITEMS' && (!validateTotal.box[0] || !validateTotal.quantity[0]) &&
                    <ul className="errorMessage">
                        <li>You have exceeded the item limit, please call or email to make this booking.</li>
                        {!validateTotal.quantity[0] &&
                            <li>Total quantities should be less than {validateTotal.quantity[1]}/{itemLimit.quantities}.</li>
                        }
                        {!validateTotal.box[0] &&
                            <li>Total boxes should be less than {validateTotal.box[1]}/{itemLimit.boxes}.</li>
                        }
                    </ul>
                }
            </StyledItems>
        </StyledBlock>
    )
};

export default ItemsForm;

const StyledItems = styled.div`
    .item {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        position: relative;
        margin-bottom: 8px;
        padding-right: 36px;
        & > div {
            margin-bottom: 10px;
        }
        &--description {
            flex: 1;
        }
        &--boxes {
            width: 120px;
        }
        &--volume {
            width: 110px;
        }
        &--weight {
            width: 90px;
        }
        &--delete {
            position: absolute;
            right: -10px;
            top: 16px;
            background: none;
            border: none;
            outline: none;
            transition: 0.1s;
            & > svg {
                width: 32px;
            }
            &:hover {
                opacity: 0.8;
            }
        }
    }
    & > .buttons {
        display: flex;
        justify-content: center;
        margin: 20px ${110 - 32}px 20px 0; /* offset for left container margin */
        & > * {
            margin: 0 10px;
        }
    }
    & > .errorMessage {
        text-align: center;
        color: ${colors.red};
    }
`;