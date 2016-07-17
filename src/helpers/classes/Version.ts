export class Version {
        public major:number;
        public minor:number;
        public patch:number;
        
        public constructor(major:number=0, minor:number=0, patch:number=0) {
          this.major = major;
          this.minor = minor;
          this.patch = patch;
        }

        public toString() {
            return [this.major, this.minor, this.patch].join('.');
        }
    }