import { AllocaStmt, ArgLoadStmt, AtomicOpStmt, BinaryOpStmt, BuiltInInputStmt, BuiltInOutputStmt, CompositeExtractStmt, ConstStmt, ContinueStmt, DiscardStmt, FragmentDerivativeStmt, FragmentForStmt, FragmentInputStmt, GlobalLoadStmt, GlobalPtrStmt, GlobalStoreStmt, GlobalTemporaryLoadStmt, GlobalTemporaryStmt, GlobalTemporaryStoreStmt, IfStmt, LocalLoadStmt, LocalStoreStmt, LoopIndexStmt, RandStmt, RangeForStmt, ReturnStmt, Stmt, TextureFunctionStmt, UnaryOpStmt, VertexForStmt, VertexInputStmt, VertexOutputStmt, WhileControlStmt, WhileStmt } from "../Stmt";
import { IRTransformer } from "../Transformer";

export class DelayedStmtReplacer extends IRTransformer {
    replaceMap: Map<Stmt, Stmt> = new Map<Stmt, Stmt>()

    markReplace(a: Stmt, b: Stmt) {
        this.replaceMap.set(a, b)
    }

    override pushNewStmt(stmt: Stmt): Stmt {
        for (let i = 0; i < stmt.operands.length; ++i) {
            if (this.replaceMap.has(stmt.operands[i])) {
                stmt.operands[i] = this.replaceMap.get(stmt.operands[i])!
            }
        }
        return super.pushNewStmt(stmt)
    }
}