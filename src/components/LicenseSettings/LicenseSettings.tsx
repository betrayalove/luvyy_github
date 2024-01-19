import React from 'react';

interface License {
    name: string;
    enabled: boolean;
    useLicensePrice: boolean;
    useCustomPrice: boolean;
    customPrice: string;
}

interface LicenseProps {
    license: License;
    index: number;
    onToggle: () => void;
    onUseLicensePrice: () => void;
    onUseCustomPrice: () => void;
    onCustomPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LicenseSettings: React.FC<LicenseProps> = ({
                                                      license,
                                                      index,
                                                      onToggle,
                                                      onUseLicensePrice,
                                                      onUseCustomPrice,
                                                      onCustomPriceChange,
                                                  }) => (
    <div key={index}>
        <label>Лицензия {index + 1}:</label>
        <div>
            <label>
                Включить лицензию:
                <input type="checkbox" checked={license.enabled} onChange={onToggle} />
            </label>
        </div>
        <div>
            <label>
                Использовать цену лицензии:
                <input
                    type="checkbox"
                    checked={license.useLicensePrice}
                    onChange={onUseLicensePrice}
                    disabled={!license.enabled}
                />
            </label>
        </div>
        <div>
            <label>
                Использовать свою цену:
                <input
                    type="checkbox"
                    checked={!license.useLicensePrice}
                    onChange={onUseCustomPrice}
                    disabled={!license.enabled}
                />
                {license.useCustomPrice && (
                    <div>
                        <label>
                            Custom Price:
                            <input
                                type="text"
                                value={license.customPrice}
                                onChange={(e) => onCustomPriceChange(e)}
                                disabled={!license.enabled || !license.useCustomPrice}
                            />
                        </label>
                    </div>
                )}
            </label>
        </div>
    </div>
);

export default LicenseSettings;
