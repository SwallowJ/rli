import { ReqService } from "@/common/request/service";

interface messsageType {
    type: string;
    name?: string;
    value: Global.obj;
}

class FileService extends ReqService {
    /**
     * 文件上传
     */
    upload(url: string, init?: REQUEST.reqInit) {
        return this.post(url, init);
    }

    private workerCode() {
        // const headers = this.
        self.onmessage = (e: MessageEvent<messsageType>) => {
            const data = e.data;
            console.log(`Message from main ${data.name} `);
            const workerResult = `Received ${data.value}`;

            console.log("Posting message back to main process");

            //@ts-ignore
            self.postMessage(workerResult);
        };
    }

    private createWorkerJS() {
        let code = this.workerCode.toString();
        code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

        const blob = new Blob([code], { type: "application/javascript" });
        const worker_script = URL.createObjectURL(blob);
        return worker_script;
    }

    worker() {
        const worker_script = this.createWorkerJS();
        const myWorker = new Worker(worker_script);

        myWorker.onmessage = (m: MessageEvent) => {
            console.log("Msg from worker: ", m.data);
            myWorker.terminate();
        };

        myWorker.postMessage({ type: "download", name: "download", value: { file: new File([], "my world") } });

        myWorker.onerror = (err: ErrorEvent) => {
            console.log("=========", err);
        };
    }
}

export default new FileService();
