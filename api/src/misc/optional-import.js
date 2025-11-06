const moduleNotFoundCodes = new Set(["ERR_MODULE_NOT_FOUND", "MODULE_NOT_FOUND"]);

const messageMentionsSpecifier = (message, specifier) => {
    if (!message) return false;
    return message.includes(`'${specifier}'`)
        || message.includes(`"${specifier}"`)
        || message.includes(specifier);
};

export const isModuleNotFoundError = (error, specifier) => {
    if (!error || typeof error !== "object") {
        return false;
    }

    if (moduleNotFoundCodes.has(error.code) && messageMentionsSpecifier(error.message, specifier)) {
        return true;
    }

    const cause = error.cause;
    if (cause && moduleNotFoundCodes.has(cause.code) && messageMentionsSpecifier(cause.message, specifier)) {
        return true;
    }

    return false;
};

export const importOptional = async (specifier) => {
    try {
        return await import(specifier);
    } catch (error) {
        if (isModuleNotFoundError(error, specifier)) {
            return null;
        }

        throw error;
    }
};
